"use client";

import { Files } from "./Files";

export default function Home() {
  return (
    <main className="flex min-h-screen relative bg-neutral-100">
      <div className="flex flex-1">
        <Files />
      </div>
    </main>
  );
}
