import { CohereTextGenerationModel, generateText } from "modelfusion";

export async function POST(req: Request) {
  const { messages } = (await req.json()) as {
    messages: {
      label: string;
      message: string;
    }[];
  };

  const initialPromp = `Eres un asistente virtual. Tienes que responder todo en español. Ayudas a la gente a resolver sus dudas. Vas a recibir un historial con las dudas que han consultado y las que has respondido. Vas a responder a la ultima pregunta del usuario. Se conciso. Habla solo en español. Solo responde el ultimo mensaje del usuario y nada más. \n\n`;

  const promps = messages.reduce((acc, message) => {
    return `${acc} ${message.label}: ${message.message} \n\n`;
  }, initialPromp);

  const text = await generateText(
    new CohereTextGenerationModel({
      model: "command-nightly",
      temperature: 0.7,
      maxCompletionTokens: 500,
    }),
    promps
  );

  return Response.json({ message: text });
}
