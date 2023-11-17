"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

interface Message {
  content: string;
  role: "user" | "assistant";
}

const MESSAGES: Message[] = [
  { content: "Hola! ¿Cómo te puedo ayudar?", role: "assistant" },
];

export const ChatAI = () => {
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(MESSAGES);

  const handleNewMessage = async (e: any) => {
    e.preventDefault();
    const message = e.target[0].value as string;

    e.target[0].value = "";

    const newMessages = [
      ...messages,
      { content: message, role: "user" },
    ] as Message[];

    setMessages(newMessages);

    const res = await axios.post<{
      message: {
        message: {
          role: string;
          content: string;
        };
      };
    }>("/api/chat-model", { messages: newMessages });
    const data = res.data;

    setMessages((messages) => [
      ...messages,
      { content: data.message.message.content, role: "assistant" },
    ]);
  };

  return (
    <>
      {!chatOpen && (
        <div className="fixed bottom-14 right-20">
          <Button
            onClick={() => setChatOpen(!chatOpen)}
            className="rounded-full shadow-lg"
          >
            Chat AI
          </Button>
        </div>
      )}

      {chatOpen && (
        <div className="fixed bottom-5 right-5 bg-neutral-100 h-[80%] w-96 rounded-sm p-4 drop-shadow-lg">
          <div className="flex flex-col gap-2 h-full">
            <div className="self-end space-x-3">
              <Button variant="ghost" onClick={() => setMessages([])}>
                Limpiar
              </Button>
              <Button onClick={() => setChatOpen(!chatOpen)}>X</Button>
            </div>

            <div className="overflow-x-auto gap-4 flex flex-col p-1 flex-1">
              {messages.map((message, index) => (
                <div
                  className={`inline-flex flex-row gap-2 bg-white rounded-lg p-3 min-w-[50%] w-[fit-content] ${
                    message.role === "assistant" ? "self-end" : ""
                  }`}
                  key={index}
                >
                  <div className="flex flex-col gap-1 w-full">
                    <span
                      className={`w-full text-sm font-semibold text-neutral-600 ${
                        message.role === "assistant" ? "text-right" : ""
                      }`}
                    >
                      {message.role}
                    </span>
                    <span className="w-full text-md text-neutral-500">
                      {message.content}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <form onSubmit={handleNewMessage} className="flex flex-row gap-2">
                <Input type="text" className="w-full" />
                <Button size="sm">Enviar</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
