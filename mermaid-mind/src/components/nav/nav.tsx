"use client";

import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/nav-bar";
import { cn } from "@/utils/cn";

export function NavBar() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <NavbarComponent className="top-2" />
    </div>
  );
}

function NavbarComponent({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("z-50 w-full items-center", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Generative AI">
          <div className="flex flex-col gap-8 p-2 text-sm">
            <ProductItem
              title="Mermaid Charts"
              href="/generate"
              src="/mermaid.webp"
              description="Use natural language to generate mermaid diagrams"
            />
            <ProductItem
              title="markdown Content"
              href="/generate"
              src="/markdown.avif"
              description="Generate markdown content using natural language"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="https://adimail.github.io">
              Developer
            </HoveredLink>
            <HoveredLink href="https://github.com/adimail/mermaid-editor">
              Source Code
            </HoveredLink>
            <HoveredLink href="https://github.com/adimail/mermaid-editor/blob/main/README.md">
              Dependencies
            </HoveredLink>
            <HoveredLink href="/new">Comming Soon...</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
