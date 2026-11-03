import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "avene:api",
    })
  : null;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

/**
 * Backed by Upstash Redis so limits are shared across serverless/edge
 * instances. Falls back to allowing all traffic (with a warning) when
 * Upstash isn't configured, so local dev works without Redis.
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  if (!ratelimit) {
    console.warn(
      "Rate limiting disabled: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set"
    );
    return { allowed: true, remaining: 10 };
  }

  const { success, remaining } = await ratelimit.limit(identifier);
  return { allowed: success, remaining };
}
