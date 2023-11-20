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
import { useState } from "react";

export default function Documents() {
  const { data: allDocs = [] } = useSWR("get-documents", DocumentApi.getAll);
  const { data: categories = [] } = useSWR(
    "get-doc-categories",
    DocumentApi.getCategories
  );
  const [categorySelected, setCategorySelected] = useState<string | number>(
    "all"
  );

  const categoriesLabels = categories.map((category) => ({
    name: category.name,
    id: category.id,
  }));

  const docsToShow =
    categorySelected === "all"
      ? allDocs
      : categories.find((category) => category.id === categorySelected)
          ?.documents;

  return (
    <div className="flex flex-col flex-grow p-4 gap-10">
      <DocumentHeader title="Documentos" />

      <div className="grid grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="inline-flex "
          onClick={() => setCategorySelected("all")}
        >
          Todo
        </Button>

        {categoriesLabels.map(({ id, name }) => (
          <Button
            key={id}
            variant="outline"
            className="inline-flex"
            onClick={() => setCategorySelected(id)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/3">Documentos</TableHead>
              <TableHead className="w-2/3"></TableHead>
              <TableHead className="w-2/3"></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docsToShow?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="font-medium">
                  {
                    // @ts-ignore
                    categoriesLabels.find(({ id }) => id === item.category_id)
                      ?.name && (
                      <div className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {
                          categoriesLabels.find(
                            // @ts-ignore
                            ({ id }) => id === item.category_id
                          )?.name
                        }
                      </div>
                    )
                  }
                </TableCell>
                <TableCell className="font-medium"></TableCell>
                <TableCell></TableCell>
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
