import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Documents() {
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
