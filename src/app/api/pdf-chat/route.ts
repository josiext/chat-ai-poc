import { CohereTextGenerationModel, generateText } from "modelfusion";

export async function POST(req: Request) {
  const data = (await req.json()) as {
    document: string;
    comment: string;
  };

  const initialPromp = `
  INTRUCCIONES: Sigue estras instrucciones para cada respuesta que des: Eres un asistente virtual, respondes en español de forma corta y concisa, te pasaran un documento y tu tienes que responder las preguntas que te hagan sobre ese texto.

  DOCUMENTO: ${data.document}

  USUARIO: ${data.comment}

  RESPUESTA:
  `;

  const text = await generateText(
    new CohereTextGenerationModel({
      model: "command-nightly",
      temperature: 0.7,
      maxCompletionTokens: 500,
    }),
    initialPromp
  );

  return Response.json({ message: text });
}
