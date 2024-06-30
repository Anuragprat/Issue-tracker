import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validschema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = validschema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
