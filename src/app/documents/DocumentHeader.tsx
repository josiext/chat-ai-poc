"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

export const DocumentHeader = ({ title }: { title?: string }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    console.log("aqui");
    // @ts-ignore
    inputRef?.current?.click();
  };

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
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
