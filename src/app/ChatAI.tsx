"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChatIcon } from "./ChatIcon";
import { ChatApi } from "@/apis/Chat";

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
  const [isLoading, setIsLoading] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNewMessage = async (e: any) => {
    e.preventDefault();
    const message = e.target[0].value as string;

    if (!message?.trim() || isLoading) return;

    e.target[0].value = "";

    const newMessages = [
      ...messages,
      { content: message, role: "user" },
    ] as Message[];

    setIsLoading(true);
    setMessages(newMessages);

    const data = await ChatApi.chat(message);

    const messagesSorted: Message[] = data.messages.data
      .reverse()
      .map((message) => ({
        content: message.content[0].text.value ?? "",
        role: message.assistant_id ? "assistant" : "user",
      }));

    setMessages(messagesSorted);
    setIsLoading(false);
  };

  return (
    <>
      {!chatOpen && (
        <div className="fixed bottom-14 right-20">
          <Button
            onClick={() => setChatOpen(!chatOpen)}
            className="rounded-full shadow-lg flex gap-2 items-center justify-center h-[50px]"
            size="lg"
          >
            <ChatIcon />
            <span>Chat</span>
          </Button>
        </div>
      )}

      {chatOpen && (
        <div className="fixed bottom-5 right-5 bg-neutral-100 h-[80%] w-96 rounded-sm p-4 drop-shadow-lg">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex justify-between space-x-3">
              <Button onClick={() => setChatOpen(!chatOpen)}>X</Button>

              <Button variant="ghost" onClick={() => setMessages([])}>
                Limpiar
              </Button>
            </div>

            <div className="border-b-2 border-neutral-200 mb-2 " />

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

              <div ref={msgEndRef} />
            </div>

            <div className="border-b-2 border-neutral-200 mb-2 " />
            <div>
              <form onSubmit={handleNewMessage} className="flex flex-row gap-2">
                <Input type="text" className="w-full" />
                <Button size="sm" className="w-[100px]">
                  {isLoading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
