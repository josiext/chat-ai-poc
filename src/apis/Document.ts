import { BACKEND_URL } from "@/configs";
import axios from "axios";

export interface Document {
  name: string;
  embed_content: string;
  path: string;
  id: number;
}

const get = async (): Promise<Document[]> => {
  const res = await axios.get(`${BACKEND_URL}/documents`);
  return res.data;
};

const save = async (form: FormData): Promise<Document[]> => {
  const res = await axios.post(`${BACKEND_URL}/documents`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const DocumentApi = {
  get,
  save,
};
