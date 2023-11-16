"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { MdOutlineFilePresent } from "react-icons/md";

export default function Home() {
  return (
    <main className="flex min-h-screen relative bg-neutral-100">
      <div className="flex flex-1">
        <DMS />
      </div>

      <Sidebar />
    </main>
  );
}

const Sidebar = () => {
  const [fileContent, setFileContent] = useState("");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<
    Array<{
      label: string;
      message: string;
    }>
  >([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setInput("");

    const newChat = [
      ...chat,
      {
        label: "Usuario",
        message: input,
      },
    ];

    setChat(newChat);

    const res = await fetch("/api/pdf-chat", {
      method: "POST",
      body: JSON.stringify({
        document: fileContent,
        comment: input,
      }),
    });

    const data = await res.json();

    setChat((prev) => [
      ...prev,
      {
        label: "AI",
        message: data.message,
      },
    ]);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("pdfFile", file);

    const res = await fetch("/api/read-pdf", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Error al leer el archivo");

    const text = await res.json();

    setFileContent(text.data);
    setChat((prev) => [
      ...prev,
      {
        label: "AI",
        message: `${file.name} leido correctamente`,
      },
    ]);
  };

  return (
    <div className="inline-flex min-h-screen w-[400px] flex-col items-center justify-between p-4 bg-white shadow-md">
      <div className="w-full">
        {chat.map((item) => (
          <div
            key={item.message + item.label}
            className={`inline-flex flex-col justify-start p-4 mb-4 rounded-lg bg-gray-800 ${
              item.label === "AI" ? "bg-gray-900" : ""
            }`}
          >
            <span className={`text-xs text-gray-400`}>{item.label}</span>
            <span className="text-sm text-white whitespace-pre-line">
              {item.message}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-1">
        <input
          type="file"
          className="w-[100px] text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-2 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          onChange={handleFileChange}
        />

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-2">
            <Input
              type="search"
              placeholder="Escribe aquí..."
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit">Buscar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DMS = () => {
  const [view, setView] = useState("Contratos");

  return (
    <div className="flex flex-col bg-neutral-100 w-full">
      <div className="text-4xl font-bold text-neutral-700 bg-white px-4 py-6 text-center shadow-md">
        DMS.AI
      </div>

      <div className="p-10 flex flex-col gap-10">
        <div className="flex gap-7 ">
          {["Contratos", "Clientes", "Proyectos"].map((item) => (
            <Button key={item}>{item}</Button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,150px))] gap-4">
          {view === "Contratos" && (
            <>
              {CONTRATOS.map((item) => (
                <button
                  key={item.id}
                  className="flex flex-col gap-3 items-center justify-start p-4 mb-4 rounded-lg bg-white"
                >
                  <MdOutlineFilePresent className="w-8 h-8" />

                  <div className="flex flex-col gap-1">
                    <span>{item.name}</span>
                    <span className="text-xs">{item.description}</span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CONTRATOS = [
  {
    id: 1,
    name: "Contrato 1",
  },
  {
    id: 2,
    name: "Contrato 2",
  },
  {
    id: 3,
    name: "Contrato 3",
  },
  {
    id: 4,
    name: "Contrato 4",
  },
];
