import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

export async function generateAIResponse(prompt: string) { const response = await openai.chat.completions.create({ model: "gpt-4-turbo-preview", messages: [ { role: "system", content: "You are a helpful SaaS assistant." }, { role: "user", content: prompt } ], });

return response.choices[0].message.content; }