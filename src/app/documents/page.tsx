"use client";

import useSWR from "swr";
import { DocumentHeader } from "./DocumentHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DocumentApi } from "@/apis/Document";

export default function Documents() {
  const { data = [] } = useSWR("get-documents", DocumentApi.get);

  const handleSelectCategory = () => {};

  return (
    <div className="flex flex-col flex-grow p-4 gap-10">
      <DocumentHeader title="Documentos" />

      <div className="grid grid-cols-4 gap-4">
        {DOC_CATEGORIES.map(({ label, href }) => (
          <Button
            key={label}
            variant="outline"
            className="inline-flex w-fit]"
            onClick={handleSelectCategory}
          >
            {label}
          </Button>
        ))}
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Documento</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Button variant="ghost">Descargar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const DOC_CATEGORIES = [
  { label: "TODO", href: "/documents/clients" },
  { label: "Clientes", href: "/documents/clients" },
  { label: "Contratos", href: "/documents/contracts" },
  { label: "Proveedores", href: "/documents/suppliers" },
];
