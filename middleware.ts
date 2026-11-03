import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkBrowserRequest } from "@/lib/api-security";

export function middleware(request: NextRequest) {
  const rejected = request.method === "POST" ? checkBrowserRequest(request) : null;
  const response = rejected || NextResponse.next();
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
