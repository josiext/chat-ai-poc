import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DocumentHeader } from "../DocumentHeader";

export default function DocumentCategory({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="flex flex-col flex-grow p-4 gap-4">
      <DocumentHeader title={params.slug} />

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

const REGISTERS = [
  { label: "Documento 1", link: "" },
  { label: "Documento 2", link: "" },
  { label: "Documento 3", link: "" },
  { label: "Documento 4", link: "" },
  { label: "Documento 5", link: "" },
];
