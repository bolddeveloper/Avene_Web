import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { sanitizeInput, validateEmail } from "@/lib/sanitize";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email format").max(254),
});

function getResendClient() {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const allowedOrigins = [env.NEXT_PUBLIC_SITE_URL, "https://avene.guatemala.com"].filter(Boolean);
  
  if (origin && !allowedOrigins.some(o => origin.includes(o))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { email } = parsed.data;

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const sanitizedEmail = sanitizeInput(email);

  try {
    const resend = getResendClient();
    const data = await resend.emails.send({
      from: "Avène Guatemala <noreply@resend.dev>",
      to: "eauthermalavene.guatemala@gmail.com",
      subject: "Nueva suscripción",
      html: `<p><strong>Email suscrito:</strong> ${sanitizedEmail}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
