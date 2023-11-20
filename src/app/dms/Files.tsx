import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdOutlineFilePresent } from "react-icons/md";

export const Files = () => {
  const [view, setView] = useState("Contratos");

  return (
    <div className="flex flex-col bg-neutral-100 w-full">
      <div className="text-4xl font-bold text-neutral-700 bg-white px-4 py-6 text-center shadow-md">
        DOCU.AI
      </div>

      <div className="p-10 flex flex-col gap-10">
        <div className="flex gap-7 ">
          {["Contratos", "Clientes", "Proyectos"].map((item) => (
            <Button key={item}>{item}</Button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,150px))] gap-4">
          {view === "Contratos" && (
            <>
              {CONTRATOS.map((item) => (
                <button
                  key={item.id}
                  className="flex flex-col gap-3 items-center justify-start p-4 mb-4 rounded-lg bg-white"
                >
                  <MdOutlineFilePresent className="w-8 h-8" />

                  <div className="flex flex-col gap-1">
                    <span>{item.name}</span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CONTRATOS = [
  {
    id: 1,
    name: "Contrato 1",
  },
  {
    id: 2,
    name: "Contrato 2",
  },
  {
    id: 3,
    name: "Contrato 3",
  },
  {
    id: 4,
    name: "Contrato 4",
  },
];
