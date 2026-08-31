import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { sanitizeInput, validateEmail } from "@/lib/sanitize";
import { isValidRequestOrigin } from "@/lib/validate-origin";
import { verifyTurnstileToken } from "@/lib/verify-turnstile";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email format").max(254),
  turnstileToken: z.string().min(1, "Security verification is required"),
});

function getResendClient() {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function POST(req: Request) {
  if (!isValidRequestOrigin(req)) {
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

  const { email, turnstileToken } = parsed.data;

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const isHuman = await verifyTurnstileToken(turnstileToken);
  if (!isHuman) {
    return NextResponse.json(
      { error: "Security verification failed" },
      { status: 403 }
    );
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
