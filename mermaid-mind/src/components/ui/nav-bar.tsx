"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import type { Session } from "next-auth";
import { motion } from "framer-motion";
import Image from "next/image";
import UserAuth, { SheetComponent } from "../auth";

interface SessionProps {
  session: Session | null;
}

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer rounded-full bg-none px-2 py-1 text-white hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute left-1/2 top-[calc(100%_+_1.2rem)] -translate-x-1/2 transform pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full w-max p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  session,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="boder relative flex items-center justify-between space-x-4 border-transparent bg-slate-800 px-3 py-4 shadow-input md:px-8"
    >
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-white"
        >
          Mermaid <span className="text-[hsl(280,100%,70%)]">Mind</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden gap-4 md:flex">{children}</div>
        <div className="hidden md:block">
          <UserAuth session={session} />
        </div>
        <div className="flex items-center justify-center md:hidden">
          <SheetComponent session={session} />
        </div>
      </div>
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
          {title}
        </h4>
        <p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <div className="text-neutral-700 hover:text-black dark:text-neutral-200 ">
      {children}
    </div>
  );
};

export function WideNavBar({ session }: SessionProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative flex w-full items-center justify-center">
      <div className={cn("top-2 z-50 w-full items-center")}>
        <Menu setActive={setActive} session={session}>
          <MenuItem setActive={setActive} active={active} item="Generative AI">
            <div className="flex flex-col gap-8 p-2 text-sm">
              <ProductItem
                title="Mermaid Charts"
                href="/generate"
                src="/mermaid.webp"
                description="Use natural language to generate mermaid diagrams"
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Editor">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink>
                <Link href="/gallery">Public gallery</Link>
              </HoveredLink>
              <HoveredLink>
                <Link href="https://adimail.github.io/posts/mermaid-js/">
                  Learn Mermaid JS
                </Link>
              </HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="About">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink>
                <Link href="https://adimail.github.io/about">Developer</Link>
              </HoveredLink>
              <HoveredLink>
                <Link href="/about">Site</Link>
              </HoveredLink>
              <HoveredLink>
                <Link href="https://github.com/adimail/mermaid-editor">
                  Source Code
                </Link>
              </HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
