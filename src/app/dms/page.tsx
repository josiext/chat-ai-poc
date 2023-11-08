"use client";

import { ChangeEvent, useState } from "react";

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
    const formData = new FormData();

    formData.append("pdfFile", event.target.files[0]);

    const res = await fetch("http://localhost:3010/extract-text", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();

    setFileContent(text);
  };

  return (
    <div className="inline-flex min-h-screen w-[400px] flex-col items-center justify-between p-4 bg-neutral-300">
      <div className="w-full">
        {chat.map((item) => (
          <div
            key={item.message + item.label}
            className="inline-flex flex-col items-start justify-start p-4 mb-4 bg-gray-100 rounded-lg dark:bg-gray-800"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
            <span className="text-sm text-gray-900 dark:text-white">
              {item.message}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-1">
        <input
          type="file"
          className="w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onChange={handleFileChange}
        />

        <form className="w-full" onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            className="inline-flex flex-col items-center justify-center p-4 mb-4 bg-gray-100 rounded-lg dark:bg-gray-800"
          >
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {item}
            </p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,150px))]  gap-4">
        {view === "Contratos" && (
          <>
            {CONTRATOS.map((item) => (
              <button
                key={item.id}
                className="flex flex-col gap-3 items-center justify-start p-4 mb-4 bg-gray-100 rounded-lg dark:bg-gray-800"
              >
                <span>ICONO</span>

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
    description: "Contrato 1",
  },
  {
    id: 2,
    name: "Contrato 2",
    description: "Contrato 2",
  },
  {
    id: 3,
    name: "Contrato 3",
    description: "Contrato 3",
  },
  {
    id: 4,
    name: "Contrato 4",
    description: "Contrato 4",
  },
];

function PdfExtractor() {
  const [pdfContent, setPdfContent] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const res = await fetch("/api/extract-pdf-text", {
      method: "POST",
      body: file,
    });

    const data = await res.json();

    console.log("response ", data);
    /*  setPdfContent(data.text); */
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>{pdfContent}</div>
    </div>
  );
}
