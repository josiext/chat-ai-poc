"use client";

import { DocumentApi } from "@/apis/Document";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export const DocumentHeader = ({ title }: { title?: string }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    // @ts-ignore
    inputRef?.current?.click();
  };

  const handleFileChange = async (event: any) => {
    const files = event?.target?.files;
    if (!files?.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) formData.append("files", files[i]);

    const res = await DocumentApi.save(formData);

    console.log(res);
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
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx"
      />
    </div>
  );
};
