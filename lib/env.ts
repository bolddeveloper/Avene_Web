import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  FACEBOOK_PIXEL_ID: z.string().optional(),
  FACEBOOK_ACCESS_TOKEN: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().optional(),
});

let cachedEnv: z.infer<typeof envSchema> | null = null;

export function getEnv() {
  if (cachedEnv) return cachedEnv;

  const envVars = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    FACEBOOK_ACCESS_TOKEN: process.env.FACEBOOK_ACCESS_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };

  const result = envSchema.safeParse(envVars);

  if (!result.success) {
    console.error("Invalid environment variables:", result.error.issues);
  }

  cachedEnv = result.success ? result.data : {
    RESEND_API_KEY: "",
    FACEBOOK_PIXEL_ID: undefined,
    FACEBOOK_ACCESS_TOKEN: undefined,
    NEXT_PUBLIC_SITE_URL: undefined,
  };

  return cachedEnv;
}

export const env = new Proxy({} as z.infer<typeof envSchema>, {
  get(_, prop) {
    const value = getEnv()[prop as keyof typeof envSchema];
    if (value === undefined && prop === "RESEND_API_KEY") {
      throw new Error(`Missing required environment variable: ${String(prop)}`);
    }
    return value;
  },
});
