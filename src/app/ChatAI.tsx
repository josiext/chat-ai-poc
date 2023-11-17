"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const ChatAI = () => {
  const [chatOpen, setChatOpen] = useState(false);

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

            <div></div>

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
