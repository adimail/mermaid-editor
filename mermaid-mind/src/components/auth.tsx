"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaUser, FaFolderOpen } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAuth() {
  const { data: session } = useSession();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-[40px] w-[40px]">
            <AvatarImage
              src={session.user.image || ""}
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

          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              signOut();
            }}
            className="cursor-pointer"
          >
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
        <div className="rounded-full bg-white px-4 py-1 text-black">
          <span>Log in</span>
        </div>
      </div>
    </div>
  );
}
