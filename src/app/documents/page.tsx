"use client";

import { fetcher } from "@/utils/fetcher";
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

const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

export default function Documents() {
  const { data = [], error, isLoading } = useSWR(API_URL, fetcher);

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
            {REGISTERS.map((invoice) => (
              <TableRow key={invoice.label}>
                <TableCell className="font-medium">{invoice.label}</TableCell>
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

const REGISTERS = [
  { label: "Documento 1", link: "" },
  { label: "Documento 2", link: "" },
  { label: "Documento 3", link: "" },
  { label: "Documento 4", link: "" },
  { label: "Documento 5", link: "" },
];
