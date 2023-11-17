"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Message {
  message: string;
  from: "user" | "ai";
}

const MESSAGES: Message[] = [
  { message: "Hello, how can I assist you?", from: "ai" },
  { message: "I need help with my code.", from: "user" },
  { message: "Sure, what seems to be the problem?", from: "ai" },
  { message: "I'm getting an error on line 50.", from: "user" },
  { message: "Could you please share the error message?", from: "ai" },
  {
    message: "TypeError: Cannot read property 'map' of undefined",
    from: "user",
  },
  {
    message: "It seems like you're trying to map over an undefined value.",
    from: "ai",
  },
  { message: "How can I fix this?", from: "user" },
  {
    message:
      "You should check if the value is defined before calling map on it.",
    from: "ai",
  },
  { message: "Okay, I'll try that. Thanks!", from: "user" },
  { message: "Okay, I'll try that. Thanks!", from: "ai" },
  { message: "Okay, I'll try that. Thanks!", from: "user" },
  { message: "Okay, I'll try that. Thanks!", from: "ai" },
  { message: "Okay, I'll try that. Thanks!", from: "user" },
];

export const ChatAI = () => {
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(MESSAGES);

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
          <div className="flex flex-col gap-2 h-full justify-between">
            <Button className="self-end" onClick={() => setChatOpen(!chatOpen)}>
              X
            </Button>

            <div className="overflow-x-auto gap-4 flex flex-col p-1">
              {messages.map((message, index) => (
                <div
                  className={`inline-flex flex-row gap-2 bg-white rounded-lg p-3 w-[fit-content] ${
                    message.from === "ai" ? "self-end" : ""
                  }`}
                  key={index}
                >
                  <div className="flex flex-col gap-1 w-full">
                    <span
                      className={`w-full text-sm font-semibold text-neutral-600 ${
                        message.from === "ai" ? "text-right" : ""
                      }`}
                    >
                      {message.from}
                    </span>
                    <span className="w-full text-md text-neutral-500">
                      {message.message}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("submit");
                }}
                className="flex flex-row gap-2"
              >
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
