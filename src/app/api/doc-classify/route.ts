import pdfParse from "pdf-parse";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("files") as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const data = await pdfParse(buffer);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          'Eres un experto clasificador de documentos. Deberas analizar el texto del documento que te pase el usuario y responderas con el tipo de documento que es y el nombre de las personas que aparecen en el texto en formato json como el siguiente Ejemplo: {"tipo": "Factura", "personas": ["José Núnez Olivares", "Benjamin Flores"]}. Solo puedes clasificar en los siguientes tipos: "Contrato", "Factura" y "Proyecto"',
      },
      {
        role: "user",
        content: data.text,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const json = JSON.parse(completion.choices[0].message.content || "{}");

  return Response.json(json);
}
