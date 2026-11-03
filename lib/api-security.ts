import { NextResponse } from "next/server";

const SITE_ORIGINS = [
  "https://avene.guatemala.com",
  "https://avene.com.gt",
  "https://www.avene.com.gt",
];

function parseOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username || url.password || url.pathname !== "/" ||
      url.search || url.hash
    ) return null;
    return url.origin;
  } catch {
    return null;
  }
}

// Origin is a browser boundary, not authentication for direct HTTP clients.
export function checkBrowserRequest(req: Request): NextResponse | null {
  const origin = req.headers.get("origin");
  const parsed = origin ? parseOrigin(origin) : null;
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const configuredOrigin = configured ? parseOrigin(configured) : null;

  if (configured && !configuredOrigin) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const allowed = [...SITE_ORIGINS, configuredOrigin].filter(Boolean);
  if (!parsed || origin !== parsed || !allowed.includes(parsed)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const contentType = req.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Expected application/json" }, { status: 415 });
  }

  return null;
}
