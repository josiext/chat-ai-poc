import pdfParse from "pdf-parse";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("pdfFile") as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const data = await pdfParse(buffer);

  return Response.json({ data: data.text });
}
