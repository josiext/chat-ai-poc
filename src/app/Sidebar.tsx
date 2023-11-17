"use client";

import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="flex flex-col flex-shrink-0 w-48 bg-neutral-100 p-3 gap-4">
      <h1 className="text-xl font-semibold text-neutral-900">DMS.AI</h1>

      <div className="flex flex-col gap-2">
        <Item href="/" label="Dashboard" />
        <Item href="/documents" label="Documentos" />
        <Item href="/settings" label="Configuraciones" />
      </div>
    </div>
  );
};

const Item = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 text-neutral-400 text-sm hover:bg-neutral-200 rounded-md p-2"
    >
      {icon}
      <p>{label}</p>
    </Link>
  );
};
