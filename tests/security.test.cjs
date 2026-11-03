const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const initialEnv = { ...process.env };
const origin = 'https://www.avene.com.gt';
const contact = { firstName: 'Ana <', lastName: 'Perez', email: 'ana@example.com', message: 'Hola <script>' };

// Exercise the actual handlers. Each scope represents one JavaScript isolate;
// separate loaders may share a scope to model independently bundled routes.
function runtime({
  scope = {}, now = () => Date.now(),
  mailResult = { data: { id: 'test-email' }, error: null },
} = {}) {
  const cache = new Map();
  const sent = [];
  const calls = [];
  const Clock = class extends Date { static now() { return now(); } };
  function load(filename) {
    filename = path.resolve(root, filename);
    if (cache.has(filename)) return cache.get(filename).exports;
    const mod = { exports: {} };
    cache.set(filename, mod);
    const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    const localRequire = (id) => {
      if (id.startsWith('@/')) return load(id.slice(2) + '.ts');
      if (id === 'resend') return { Resend: class {
        constructor(apiKey) { assert.equal(apiKey, 'test-resend-key'); }
        emails = { send: async (payload) => { sent.push(payload); return mailResult; } };
      } };
      return require(id);
    };
    const interceptedFetch = async (url) => {
      calls.push(String(url));
      throw new Error('Unexpected external request');
    };
    new Function('require', 'module', 'exports', 'fetch', 'globalThis', 'Date', compiled)(
      localRequire, mod, mod.exports, interceptedFetch, scope, Clock,
    );
    return mod.exports;
  }
  return { load, sent, calls };
}

function request(route, body, headers = {}) {
  return new Request(origin + '/api/' + route, {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  process.env.RESEND_API_KEY = 'test-resend-key';
  for (const key of [
    'NEXT_PUBLIC_SITE_URL', 'EMAIL_RATE_LIMIT_PER_MINUTE', 'EMAIL_RATE_LIMIT_PER_DAY',
    'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN',
  ]) delete process.env[key];
});
afterEach(() => {
  for (const key of Object.keys(process.env)) if (!(key in initialEnv)) delete process.env[key];
  Object.assign(process.env, initialEnv);
});

test('hostile Origin representations cannot reach either provider, even with trusted Referer', async () => {
  const app = runtime();
  const hostile = [
    'https://avene.guatemala.com.evil.test', 'https://evilavene.guatemala.com',
    'https://avene.guatemala.com@evil.test', 'https://www.avene.com.gt:444',
    'http://www.avene.com.gt', 'null', '', 'https://www.avene.com.gt/path',
    'https://www.avene.com.gt?x=1', 'https://www.avene.com.gt#x',
    'https://www.avene.com.gt https://evil.test',
  ];
  for (const route of ['send-email', 'suscribete']) {
    const handler = app.load(`app/api/${route}/route.ts`);
    for (const value of hostile) {
      assert.equal((await handler.POST(request(route, route === 'send-email' ? contact : { email: contact.email }, {
        Origin: value, Referer: 'https://evilavene.guatemala.com',
      }))).status, 403, `${route}: ${value}`);
    }
    const missing = request(route, contact);
    missing.headers.delete('Origin');
    assert.equal((await handler.POST(missing)).status, 403);
  }
  assert.equal(app.sent.length, 0);
  assert.equal(app.calls.length, 0);
});

test('middleware rejects the combined hostile Origin and Referer bypass', () => {
  const { NextRequest } = require('next/server');
  const middleware = runtime().load('middleware.ts').middleware;
  const req = new NextRequest(origin + '/api/suscribete', {
    method: 'POST', headers: { Origin: 'https://avene.guatemala.com.evil.test', Referer: 'https://evilavene.guatemala.com', 'Content-Type': 'application/json' },
  });
  assert.equal(middleware(req).status, 403);
  assert.equal(middleware(req).headers.get('X-Content-Type-Options'), 'nosniff');
});

test('exact configured origins and JSON charset pass; text/plain and alternate ports fail', async () => {
  const app = runtime();
  const check = app.load('lib/api-security.ts').checkBrowserRequest;
  for (const site of ['https://avene.guatemala.com', origin, 'https://avene.com.gt']) {
    assert.equal(check(request('suscribete', {}, { Origin: site, 'Content-Type': 'application/json; charset=utf-8' })), null);
  }
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000/';
  assert.equal(check(request('suscribete', {}, { Origin: 'http://localhost:3000' })), null);
  assert.equal(check(request('suscribete', {}, { Origin: 'http://localhost:3001' })).status, 403);
  for (const route of ['send-email', 'suscribete']) {
    const res = await app.load(`app/api/${route}/route.ts`).POST(request(route, contact, { 'Content-Type': 'text/plain' }));
    assert.equal(res.status, 415);
  }
  process.env.NEXT_PUBLIC_SITE_URL = 'https://trusted.test/path';
  assert.equal(check(request('suscribete', {})).status, 503);
  assert.equal(app.sent.length, 0);
});

test('both forms work with the original Resend key, senders and recipient, without Redis', async () => {
  const app = runtime();
  for (const route of ['send-email', 'suscribete']) {
    const body = route === 'send-email' ? contact : { email: contact.email };
    const res = await app.load(`app/api/${route}/route.ts`).POST(request(route, body));
    assert.equal(res.status, 200);
    assert.equal((await res.json()).success, true);
  }
  assert.equal(app.sent.length, 2);
  assert.equal(app.calls.length, 0);
  assert.equal(app.sent[0].from, 'Avène Contacto <noreply@resend.dev>');
  assert.equal(app.sent[1].from, 'Avène Guatemala <noreply@resend.dev>');
  assert.equal(app.sent[0].subject, 'Nuevo mensaje desde el formulario');
  assert.equal(app.sent[1].subject, 'Nueva suscripción');
  for (const message of app.sent) assert.equal(message.to, 'eauthermalavene.guatemala@gmail.com');
  assert.match(app.sent[0].html, /Ana &lt;/);
  assert.match(app.sent[0].html, /Hola &lt;script&gt;/);
  assert.equal(app.sent[1].html, '<p><strong>Email suscrito:</strong> ana@example.com</p>');
});

test('invalid JSON and forms consume no allowance and send nothing', async () => {
  const app = runtime();
  for (const route of ['send-email', 'suscribete']) {
    const handler = app.load(`app/api/${route}/route.ts`);
    for (const body of ['{', { email: 'invalid' }]) assert.equal((await handler.POST(request(route, body))).status, 400);
  }
  const reserve = app.load('lib/email-rate-limit.ts').reserveEmail;
  for (let i = 0; i < 10; i++) assert.equal(await reserve(), null);
  assert.equal((await reserve()).status, 429);
  assert.equal(app.sent.length, 0);
  assert.equal(app.calls.length, 0);
});

test('provider rejection never produces a false delivery confirmation', async () => {
  const app = runtime({ mailResult: { data: null, error: { name: 'validation_error', message: 'Rejected' } } });
  for (const route of ['send-email', 'suscribete']) {
    const res = await app.load(`app/api/${route}/route.ts`).POST(request(route, route === 'send-email' ? contact : { email: contact.email }));
    assert.equal(res.status, 502);
    assert.equal((await res.json()).success, false);
  }
  assert.equal(app.calls.length, 0);
});

test('retired CAPI forwards no event, including empty and repeated Purchase requests', async () => {
  const app = runtime();
  const handler = app.load('app/api/fb-capi/route.ts');
  for (const body of [{}, { event_name: 'Purchase', custom_data: { value: 99999, currency: 'USD' } }, { event_name: 'PageView' }, {}]) {
    assert.equal((await handler.POST(request('fb-capi', body))).status, 410);
  }
  assert.equal(app.calls.length, 0);
  assert.equal(app.sent.length, 0);
});

test('concurrent mail routes share the local cap; forged forwarding headers cannot reset it', async () => {
  const scope = {};
  const a = runtime({ scope }), b = runtime({ scope });
  const handlers = [a.load('app/api/send-email/route.ts'), b.load('app/api/suscribete/route.ts')];
  const responses = await Promise.all(Array.from({ length: 40 }, (_, i) => {
    const route = i % 2 ? 'suscribete' : 'send-email';
    return handlers[i % 2].POST(request(route, i % 2 ? { email: contact.email } : contact, {
      'x-forwarded-for': `forged-${i}`, 'x-real-ip': `other-${i}`,
    }));
  }));
  assert.equal(responses.filter(r => r.status === 200).length, 10);
  assert.equal(responses.filter(r => r.status === 429).length, 30);
  assert.equal(a.sent.length + b.sent.length, 10);
  assert.equal(a.calls.length + b.calls.length, 0);
  assert.ok(Number(responses.find(r => r.status === 429).headers.get('Retry-After')) > 0);
});

test('local windows expire, daily budget persists, and denials never extend deadlines', async () => {
  let time = 1000;
  process.env.EMAIL_RATE_LIMIT_PER_MINUTE = '2';
  process.env.EMAIL_RATE_LIMIT_PER_DAY = '3';
  const reserve = runtime({ now: () => time }).load('lib/email-rate-limit.ts').reserveEmail;
  assert.equal(await reserve(), null);
  assert.equal(await reserve(), null);
  time = 2000;
  assert.equal((await reserve()).headers.get('Retry-After'), '59');
  time = 61_000;
  assert.equal(await reserve(), null);
  const daily = await reserve();
  assert.equal(daily.status, 429);
  assert.equal(daily.headers.get('Retry-After'), '86340');
  time = 62_000;
  assert.equal((await reserve()).headers.get('Retry-After'), '86339');
  time = 86_401_000;
  assert.equal(await reserve(), null);
});

test('invalid optional limits fail closed without requiring any new service', async () => {
  for (const key of ['EMAIL_RATE_LIMIT_PER_MINUTE', 'EMAIL_RATE_LIMIT_PER_DAY']) {
    for (const value of ['', '0', '-1', '1.5', 'NaN', '9007199254740992']) {
      process.env[key] = value;
      const app = runtime();
      assert.equal((await app.load('lib/email-rate-limit.ts').reserveEmail()).status, 503);
      assert.equal(app.calls.length, 0);
    }
    delete process.env[key];
  }
});

test('separate isolates have separate allowances: no distributed quota is claimed', async () => {
  const a = runtime(), b = runtime();
  const reserveA = a.load('lib/email-rate-limit.ts').reserveEmail;
  for (let i = 0; i < 10; i++) assert.equal(await reserveA(), null);
  assert.equal((await reserveA()).status, 429);
  assert.equal(await b.load('lib/email-rate-limit.ts').reserveEmail(), null);
});
