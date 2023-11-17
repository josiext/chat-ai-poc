"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineDashboardCustomize,
  MdOutlineFileOpen,
  MdSettings,
} from "react-icons/md";

export const Sidebar = () => {
  return (
    <div className="flex flex-col flex-shrink-0 w-48 bg-neutral-100 p-3 gap-10">
      <Link href={"/"}>
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-2xl font-semibold text-neutral-900 mt-6 align-middle	">
            DMS.AI
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-6">
        <Item
          href="/"
          label="Dashboard"
          icon={<MdOutlineDashboardCustomize size={24} />}
        />
        <Item
          href="/documents"
          label="Documentos"
          icon={<MdOutlineFileOpen size={24} />}
        />
        <Item
          href="/settings"
          label="Configuraciones"
          icon={<MdSettings size={24} />}
        />
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
  // check if the current page is the same as the href
  // if it is, add the active class to hightlight the current page

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 text-neutral-400 text-sm font-semibold hover:bg-neutral-200 rounded-md p-2 ${
        isActive ? "bg-neutral-200 text-neutral-600" : ""
      }`}
    >
      {icon}
      <p>{label}</p>
    </Link>
  );
};
