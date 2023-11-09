"use client";

import { ChangeEvent, useState } from "react";
import { MdOutlineFilePresent } from "react-icons/md";

export default function Home() {
  return (
    <main className="flex min-h-screen relative">
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
    <div className="inline-flex min-h-screen w-[400px] flex-col items-center justify-between p-4 bg-neutral-300">
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
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium sr-only text-white"
          >
            Search
          </label>
          <div className="flex flex-row gap-2">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm  border  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write..."
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DMS = () => {
  const [view, setView] = useState("Contratos");

  return (
    <div className="p-8 flex flex-col gap-10">
      <div className="flex gap-7 ">
        {["Contratos", "Clientes", "Proyectos"].map((item) => (
          <button
            key={item}
            className="inline-flex flex-col items-center justify-center p-4 mb-4 rounded-lg bg-gray-800"
            onClick={() => setView(item)}
          >
            <p className="text-2xl font-semibold  text-white">{item}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,150px))] gap-4">
        {view === "Contratos" && (
          <>
            {CONTRATOS.map((item) => (
              <button
                key={item.id}
                className="flex flex-col gap-3 items-center justify-start p-4 mb-4 rounded-lg bg-gray-800"
              >
                <MdOutlineFilePresent className="w-8 h-8  text-white" />

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
  );
};

const CONTRATOS = [
  {
    id: 1,
    name: "Contrato 1",
    description: "Descripcion 1",
  },
  {
    id: 2,
    name: "Contrato 2",
    description: "Descripcion 2",
  },
  {
    id: 3,
    name: "Contrato 3",
    description: "Descripcion 3",
  },
  {
    id: 4,
    name: "Contrato 4",
    description: "Descripcion 4",
  },
];
