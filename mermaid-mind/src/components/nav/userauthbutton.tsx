import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { signIn } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default async function UserAuth() {
  const session = await getServerAuthSession();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-[30px] w-[30px] md:h-[39px] md:w-[39px]">
            <AvatarImage
              src={session.user.image ?? undefined}
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
              <p className="text-muted-foreground w-[200px] truncate text-sm">
                {session.user.email}
              </p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div onClick={() => signIn("google", { callbackUrl: "/" })}>
      <div className="flex justify-center text-center">
        <div className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white">
          <span>Log in</span>
        </div>
      </div>
    </div>
  );
}
