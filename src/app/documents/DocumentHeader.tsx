"use client";

import { Document, DocumentApi } from "@/apis/Document";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReloadIcon } from "@radix-ui/react-icons";

export const DocumentHeader = ({ title }: { title?: string }) => {
  const [documentUploaded, setDocumentUploaded] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    // @ts-ignore
    inputRef?.current?.click();
  };

  const handleFileChange = async (event: any) => {
    const files = event?.target?.files;
    if (!files?.length) {
      // @ts-ignore
      if (inputRef.current?.value) inputRef.current.value = "";
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) formData.append("files", files[i]);

    /* const res = await DocumentApi.save(formData); */

    const categories = [];
    for (let i = 0; i < files.length; i++) {
      const classifyFormData = new FormData();
      classifyFormData.append("files", files[i]);

      const classify = await DocumentApi.classify(classifyFormData);
      categories.push(classify);
    }

    setDocumentUploaded(
      categories.map((category, idx) => ({
        id: idx,
        name: "Documento " + (idx + 1),
        tags: category.tipo,
        people: category.personas,
      }))
    );

    setIsLoading(false);

    // @ts-ignore
    if (inputRef.current?.value) inputRef.current.value = "";
  };

  return (
    <div className="p-4 flex gap-10 items-center">
      <h1 className="text-3xl font-semibold text-neutral-900">{title}</h1>

      <Button
        size="sm"
        className="w-[150px]"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "+ Documento"
        )}
      </Button>

      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx"
      />

      <Dialog
        open={documentUploaded.length > 0}
        onOpenChange={() => setDocumentUploaded([])}
      >
        <DialogContent className="min-w-[900px]">
          <DialogHeader>
            <DialogTitle>Documentos guardados y clasificados</DialogTitle>
            <DialogDescription className="py-10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Involucrados</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentUploaded.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.name}
                      </TableCell>
                      <TableCell>{invoice.tags}</TableCell>
                      <TableCell>
                        {invoice.people?.map((person, idx) => (
                          <div key={idx}>🧑‍🦰 {person.toLocaleLowerCase()}</div>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}

                  <div className="flex gap-2 mt-10">
                    <Button className="w-full">Aceptar</Button>
                  </div>
                </TableBody>
              </Table>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
