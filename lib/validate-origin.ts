const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  "https://avene.guatemala.com",
].filter((value): value is string => Boolean(value));

function hostOf(url: string): string | null {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

const ALLOWED_HOSTS = ALLOWED_ORIGINS
  .map(hostOf)
  .filter((host): host is string => Boolean(host));

function isHostAllowed(host: string | null): boolean {
  if (!host) return false;
  return ALLOWED_HOSTS.some(
    (allowed) => host === allowed || host.endsWith(`.${allowed}`)
  );
}

/**
 * Fail-closed origin check: valid only if Origin (or, failing that, Referer)
 * resolves to an allowed host. Missing/unparseable headers are rejected.
 */
export function isValidRequestOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (origin) {
    return isHostAllowed(hostOf(origin));
  }

  const referer = request.headers.get("referer");
  if (referer) {
    return isHostAllowed(hostOf(referer));
  }

  return false;
}
