import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages = [] } = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente de un aplicación web llamada DMS.AI que fue creada por la empresa Lemontech. Tienes que responder de forma simple y concisa las preguntas que te hagan.",
      },
      ...messages,
    ],
    model: "gpt-3.5-turbo",
  });

  return Response.json({ message: completion.choices[0] });
}
