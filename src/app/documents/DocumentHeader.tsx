"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

export const DocumentHeader = ({ title }: { title?: string }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    // @ts-ignore
    inputRef?.current?.click();
  };

  const handleFileChange = async (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

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

    console.log(text);

    // TODO send to api
  };

  return (
    <div className="p-4 flex gap-10 items-center">
      <h1 className="text-3xl font-semibold text-neutral-900">{title}</h1>

      <Button size="sm" onClick={handleClick}>
        + Documento
      </Button>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
