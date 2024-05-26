"use client";

import Link from "next/link";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Projects() {
  return (
    <AuroraBackground>
      <div className="relative flex flex-col items-center justify-center gap-4 px-4 text-gray-300">
        <div className="fixed left-5 top-5 flex items-center gap-4">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-white"
          >
            Mermaid <span className="text-[hsl(280,100%,70%)]">Mind</span>
          </Link>
        </div>
        <div className="text-center text-3xl font-bold dark:text-white md:text-7xl">
          Comming Soon
        </div>
        <div className="py-4 text-base font-extralight dark:text-neutral-200 md:text-4xl">
          You will soon be able to save your markdown and mermaid projects to
          cloud
        </div>
      </div>
    </AuroraBackground>
  );
}
