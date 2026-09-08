import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const leadSchema = z.object({
  email: z.string().email(),
  source: z.string().max(64).optional(),
});

// POST /api/leads — capture an email from the hero form or any future
// lead-capture point on the site. Upserts on email so a repeat signup
// (e.g. from a different section) doesn't error.
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { email, source } = parsed.data;

  try {
    const lead = await prisma.lead.upsert({
      where: { email },
      update: { source: source ?? undefined },
      create: { email, source },
    });

    // TODO: wire this up to your email provider (e.g. Resend, Postmark,
    // ConvertKit) to send a welcome email or add to a nurture sequence.

    return NextResponse.json({ id: lead.id, email: lead.email }, { status: 201 });
  } catch (err) {
    console.error("Failed to save lead", err);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }
}
