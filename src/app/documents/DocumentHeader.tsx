import { Button } from "@/components/ui/button";

export const DocumentHeader = ({ title }: { title?: string }) => {
  return (
    <div className="p-4 flex gap-10 items-center">
      <h1 className="text-3xl font-semibold text-neutral-900">{title}</h1>

      <Button size="sm">+ Documento</Button>
    </div>
  );
};
