"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { FaUser, FaFolderOpen } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiMenu4Fill } from "react-icons/ri";
import { Session } from "next-auth";

interface SessionProps {
  session: Session | null;
}

export default function UserAuth({ session }: SessionProps) {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-[40px] w-[40px]">
            <AvatarImage
              src={session.user.image ?? ""}
              alt={"User profile photo"}
            />
            <AvatarFallback className="h-full w-full animate-pulse bg-gray-300">
              <FaUser size={20} color="gray" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-2xl bg-slate-100 p-2 text-black shadow-lg"
        >
          <div className="flex items-center justify-start gap-2 p-2 text-sm">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{session.user.name}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>

          <DropdownMenuItem className="cursor-pointer">
            <div className="flex items-center gap-3 px-2 py-1">
              <FaFolderOpen size={20} />
              <Link href={"/projects"} className="flex items-center">
                View saved projects
              </Link>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer">
            <div className="flex items-center gap-3 px-2 py-1">
              <RxExit size={20} />
              <div className="flex items-center">Log out</div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div
      className=" cursor-pointer"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <div className="flex justify-center text-center">
        <div className="rounded-full bg-white px-5 py-2 text-black">
          <span>Log in</span>
        </div>
      </div>
    </div>
  );
}

export function SheetComponent({ session }: SessionProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <RiMenu4Fill size={27} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-extrabold tracking-tight">
                Mermaid <span className="text-[hsl(280,100%,70%)]">Mind</span>
              </Link>
            </div>
          </SheetTitle>
          <SheetDescription>
            <div className="flex flex-col items-start justify-start">
              <ul className="mb-10 mt-10 flex flex-col gap-3 text-left">
                <li>
                  <Link href="/generate">Generate with AI</Link>
                </li>
                <li>
                  <Link href="/projects">Saved Projects</Link>
                </li>
                <li>
                  <Link href="https://adimail.github.io/posts/mermaid-js/">
                    Mermaid JS
                  </Link>
                </li>
              </ul>
              <h2 className="mt-6 text-xl font-bold">About</h2>
              <ul className="mb-10 mt-4 flex flex-col gap-3 text-left ">
                <li>
                  <Link href="https://adimail.github.io">Developer</Link>
                </li>
                <li>
                  <Link href="https://github.com/adimail/mermaid-editor">
                    Source code
                  </Link>
                </li>
                <li>
                  <Link href="/new">Coming Soon</Link>
                </li>
              </ul>
              <UserAuth session={session} />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
