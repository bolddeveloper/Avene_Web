import { NextResponse } from "next/server";

type Window = { startedAt: number; count: number };
type Budget = { minute: Window; day: Window };

const STATE_KEY = Symbol.for("avene.email-budget.v1");
const MINUTE = 60_000;
const DAY = 86_400_000;

function limit(value: string | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  if (!/^[1-9]\d*$/.test(value)) throw new Error("Invalid email budget");
  const result = Number(value);
  if (!Number.isSafeInteger(result)) throw new Error("Invalid email budget");
  return result;
}

// Fixed state shared by module copies in this JavaScript isolate only.
// Other processes, serverless instances and cold starts have separate budgets.
// No client header or request value creates a counter or selects an allowance.
export async function reserveEmail(): Promise<NextResponse | null> {
  try {
    const minuteMax = limit(process.env.EMAIL_RATE_LIMIT_PER_MINUTE, 10);
    const dayMax = limit(process.env.EMAIL_RATE_LIMIT_PER_DAY, 100);
    const now = Date.now();
    const scope = globalThis as typeof globalThis & { [STATE_KEY]?: Budget };
    const budget = scope[STATE_KEY] ??= {
      minute: { startedAt: now, count: 0 },
      day: { startedAt: now, count: 0 },
    };

    if (now - budget.minute.startedAt >= MINUTE) {
      budget.minute = { startedAt: now, count: 0 };
    }
    if (now - budget.day.startedAt >= DAY) {
      budget.day = { startedAt: now, count: 0 };
    }

    let retryAfter = 0;
    if (budget.minute.count >= minuteMax) {
      retryAfter = Math.max(retryAfter, budget.minute.startedAt + MINUTE - now);
    }
    if (budget.day.count >= dayMax) {
      retryAfter = Math.max(retryAfter, budget.day.startedAt + DAY - now);
    }
    if (retryAfter > 0) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.max(1, Math.ceil(retryAfter / 1000))),
            "Cache-Control": "no-store",
          },
        },
      );
    }

    // No await before both reservations: concurrent calls in this isolate cannot
    // interleave the check and increment. Provider failures still consume budget.
    budget.minute.count++;
    budget.day.count++;
    return null;
  } catch {
    console.error("Invalid email rate-limit configuration; delivery blocked");
    return NextResponse.json(
      { error: "Service unavailable. Please try again later." },
      { status: 503, headers: { "Retry-After": "60", "Cache-Control": "no-store" } },
    );
  }
}
