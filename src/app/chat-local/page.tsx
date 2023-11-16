"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState<boolean | null>(null);

  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    const onMessageReceived = (e: any) => {
      switch (e.data.status) {
        case "initiate":
          setReady(false);
          break;
        case "ready":
          setReady(true);
          break;
        case "complete":
          setResult(e.data?.output?.[0].generated_text || "");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker?.current?.removeEventListener("message", onMessageReceived);
  });

  const classify = useCallback((text: string) => {
    if (worker.current) {
      worker.current.postMessage({ text });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Transformers.js</h1>
      <h2 className="text-2xl mb-4 text-center">Next.js template</h2>

      <form
        className="flex flex-row gap-2 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          classify(e.target[0].value);
        }}
      >
        <input
          className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
          type="text"
          placeholder="Enter text here"
        />
        <button>Aceptar</button>
      </form>

      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded">
          {!ready || !result ? "Loading..." : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}