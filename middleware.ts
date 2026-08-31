import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidRequestOrigin } from "@/lib/validate-origin";
import { checkRateLimit } from "@/lib/rate-limit";

// Built from what app/layout.tsx actually loads: GTM, GA4 (gtag.js), Meta
// Pixel, plus the Cloudflare Turnstile widget used on the contact/subscribe
// forms. The inline GTM/GA4/Pixel snippets in layout.tsx require
// 'unsafe-inline' on script-src (they're first-party, hardcoded, not
// user-controlled — a nonce-based CSP would remove this but needs a bigger
// refactor to thread a per-request nonce through every <Script> tag).
// A handful of components (chart.tsx, progress.tsx, layout.tsx noscript
// blocks) set inline `style` attributes, hence 'unsafe-inline' on style-src.
// React's dev-mode error overlay uses eval() for stack traces; it never
// does in production, so 'unsafe-eval' is only added outside prod.
const isDev = process.env.NODE_ENV !== "production";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://connect.facebook.net https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://connect.facebook.net https://www.facebook.com https://challenges.cloudflare.com",
  "frame-src https://www.googletagmanager.com https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Content-Security-Policy", CSP);
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    if (!isValidRequestOrigin(request)) {
      return withSecurityHeaders(
        NextResponse.json({ error: "Origin not allowed" }, { status: 403 })
      );
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               request.headers.get("x-real-ip") ||
               "unknown";

    const { allowed, remaining } = await checkRateLimit(ip);

    if (!allowed) {
      return withSecurityHeaders(
        NextResponse.json(
          { error: "Too many requests. Please try again later." },
          {
            status: 429,
            headers: { "Retry-After": "60" },
          }
        )
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    return withSecurityHeaders(response);
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
