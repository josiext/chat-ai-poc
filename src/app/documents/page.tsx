"use client";

import { Card, CardContent } from "@/components/ui/card";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import useSWR from "swr";

const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

export default function Documents() {
  const { data = [], error, isLoading } = useSWR(API_URL, fetcher);

  return (
    <div className="flex flex-col flex-grow p-4 gap-4">
      <h1 className="text-2xl font-semibold text-neutral-900">Documentos</h1>

      <div className="grid grid-cols-2 gap-4">
        {DOC_CATEGORIES.map(({ label, href }) => (
          <Link key={label} href={href}>
            <Card className="inline">
              <CardContent className="text-lg flex justify-center items-center font-semibold text-neutral-900">
                {label}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

const DOC_CATEGORIES = [
  { label: "Clientes", href: "/documents/clients" },
  { label: "Contratos", href: "/documents/contracts" },
  { label: "Proveedores", href: "/documents/suppliers" },
];
