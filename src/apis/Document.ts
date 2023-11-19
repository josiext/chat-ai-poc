import { BACKEND_URL } from "@/configs";
import axios from "axios";

export interface Document {
  name: string;
  embed_content: string;
  path: string;
  id: number;
  url?: string;
  tags?: string[];
  people?: string[];
}

export interface Category {
  external_thread_id: any;
  id: number;
  name: string;
  documents: Array<{
    id: number;
    category_id: number;
    name: string;
    external_id: string;
  }>;
}

export interface DocumentClassify {
  tipo: string;
}

const getAll = async (): Promise<Document[]> => {
  const res = await axios.get(`${BACKEND_URL}/documents`);
  return res.data;
};

const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${BACKEND_URL}/categories`);
  return res.data;
};

const save = async (form: FormData): Promise<Document[]> => {
  const res = await axios.post(`${BACKEND_URL}/documents/upload`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

const classify = async (form: FormData): Promise<DocumentClassify> => {
  const res = await axios.post("/api/doc-classify", form);
  return res.data;
};

export const DocumentApi = {
  getAll,
  getCategories,
  save,
  classify,
};
