import { auth } from "@clerk/nextjs"; import { NextResponse } from "next/server"; import { generateAIResponse } from "@/lib/openai";

export async function POST(req: Request) { try { const { userId } = auth(); if (!userId) return new NextResponse("Unauthorized", { status: 401 });

const body = await req.json();
const { prompt } = body;

if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

const result = await generateAIResponse(prompt);

return NextResponse.json({ result });


} catch (error) { console.error("[GENERATE_ERROR]", error); return new NextResponse("Internal Error", { status: 500 }); } }