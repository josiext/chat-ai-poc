import { BACKEND_URL } from "@/configs";
import axios from "axios";

export type ChatResponse = {
  messages: {
    data: Array<{
      id: string;
      assistant_id?: string;
      content: Array<{
        text: {
          annotations: Array<any>;
          value: string;
        };
        type: string;
      }>;
      created_at: number;
      file_ids: Array<any>;
      metadata: {};
      object: string;
      role: string;
      run_id?: string;
      thread_id: string;
    }>;
    object: string;
    first_id: string;
    last_id: string;
    has_more: boolean;
  };
};

const chat = async (
  message: string,
  thread_id?: string | null
): Promise<ChatResponse> => {
  let URL = `${BACKEND_URL}/chat?message=${message}`;
  if (thread_id) URL += `&thread_id=${thread_id}`;

  const res = await axios.post(URL);
  return res.data;
};

export const ChatApi = {
  chat,
};
