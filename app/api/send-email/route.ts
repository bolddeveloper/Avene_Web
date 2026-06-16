import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { sanitizeInput, validateEmail } from "@/lib/sanitize";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email format").max(254),
  message: z.string().min(1, "Message is required").max(5000),
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, message } = parsed.data;

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const sanitizedFirstName = sanitizeInput(firstName);
  const sanitizedLastName = sanitizeInput(lastName);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedMessage = sanitizeInput(message);

  try {
    const resend = getResendClient();
    const data = await resend.emails.send({
      from: "Avène Contacto <noreply@resend.dev>",
      to: "eauthermalavene.guatemala@gmail.com",
      subject: "Nuevo mensaje desde el formulario",
      html: `
        <p><strong>Nombre:</strong> ${sanitizedFirstName} ${sanitizedLastName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
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
