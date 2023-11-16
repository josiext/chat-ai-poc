"use client";

import { Files } from "./Files";
import { Sidebar } from "./Sidbar";

export default function Home() {
  return (
    <main className="flex min-h-screen relative bg-neutral-100">
      <div className="flex flex-1">
        <Files />
      </div>

      <Sidebar />
    </main>
  );
}
