import { NextResponse } from "next/server";

// There is no verified server-side purchase workflow or first-party caller.
// Keep this endpoint retired until events can be derived from trusted business state.
export async function POST() {
  return NextResponse.json({ error: "Endpoint retired" }, { status: 410 });
}
