import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import EditorType from "./editortypeDropdown";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu4Fill } from "react-icons/ri";

export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed flex w-full items-center justify-between bg-gray-800 px-3 py-2 text-white">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Mermaid <span className="text-[hsl(280,100%,70%)]">Mind</span>
        </Link>
        <EditorType />
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <Link
          href="/generate"
          className="rounded-full px-6 py-1 text-sm no-underline transition hover:bg-white/20"
          aria-label="Generate with AI"
        >
          Generate With AI
        </Link>

        <Sheet>
          <SheetTrigger className="rounded-full px-6 py-1 text-sm no-underline transition hover:bg-white/20">
            Saved Projects
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Saved Projects</SheetTitle>
              <SheetDescription>
                Here are your saved projects. You can view or edit them.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-6 py-1 text-sm no-underline transition hover:bg-white/20"
          aria-label={session ? "Sign out" : "Sign in"}
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <Sheet>
          <SheetTrigger>
            <RiMenu4Fill size={20} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <EditorType />
            <div className="flex flex-col gap-2">
              <Link
                href="/generate"
                className="rounded-full bg-white/10 px-6 py-1 text-sm no-underline transition hover:bg-white/20"
                aria-label="Generate with AI"
              >
                Generate With AI
              </Link>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-6 py-1 text-sm no-underline transition hover:bg-white/20"
                aria-label={session ? "Sign out" : "Sign in"}
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
              <Sheet>
                <SheetTrigger className="rounded-full bg-white/10 px-6 py-1 text-sm no-underline transition hover:bg-white/20">
                  Saved Projects
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Saved Projects</SheetTitle>
                    <SheetDescription>
                      <p>
                        No projects saved. Saved projects will be visible here.
                      </p>
                    </SheetDescription>
                  </SheetHeader>
                  <ul>
                    <li>Project 1</li>
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
