import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { sanitizeInput } from "@/lib/sanitize";

const fbEventSchema = z.object({
  event_name: z.string().optional(),
  event_source_url: z.string().url().optional(),
  custom_data: z
    .object({
      value: z.number().optional(),
      currency: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const allowedOrigins = [env.NEXT_PUBLIC_SITE_URL, "https://avene.guatemala.com"].filter(Boolean);
  
  if (origin && !allowedOrigins.some(o => origin.includes(o))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pixelId = env.FACEBOOK_PIXEL_ID;
  const accessToken = env.FACEBOOK_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return NextResponse.json(
      { error: "Facebook Pixel not configured" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = fbEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { event_name, event_source_url, custom_data } = parsed.data;

  const sanitizedUrl = event_source_url ? sanitizeInput(event_source_url) : undefined;

  const payload = {
    data: [
      {
        event_name: event_name || "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: sanitizedUrl,
        action_source: "website",
        user_data: {
          client_user_agent: req.headers.get("user-agent"),
        },
        custom_data: custom_data || {
          value: 199.99,
          currency: "USD",
        },
      },
    ],
  };

  try {
    const fbRes = await fetch(
      `https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await fbRes.json();

    if (!fbRes.ok) {
      return NextResponse.json(
        { error: "Facebook API error", details: result },
        { status: fbRes.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Facebook CAPI error:", error);
    return NextResponse.json(
      { error: "Failed to send event to Facebook" },
      { status: 500 }
    );
  }
}
