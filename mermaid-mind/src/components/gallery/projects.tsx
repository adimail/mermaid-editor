"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { render } from "@/utils/mermaid";
import { calculateTimeDifference } from "@/utils/utils";
import { Boxes } from "@/components/ui/background-boxes";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { Project, DiagramHtml, SessionProps } from "@/types/types";
import { parseMermaidString } from "@/utils/utils";

export default function Results({ session }: SessionProps) {
  const [newGenerations, setNewGenerations] = useState<Project[]>([]);
  const [diagramHtml, setDiagramHtml] = useState<DiagramHtml>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleClick = (code: Project) => {
    navigator.clipboard
      .writeText(parseMermaidString(code.code))
      .then(() => {
        toast({
          title: `Copied \"${code.title}\" to clipboard`,
          duration: 5000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    let url = `/api/projects`;
    if (session) {
      url = `/api/projects?userID=${session?.user.id}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data && Array.isArray(data.diagrams)) {
            setNewGenerations(data.diagrams);
          } else {
            console.error("Expected an array of diagrams but received:", data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching new generations:", error);
          setLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    const renderDiagrams = async () => {
      try {
        await Promise.all(
          newGenerations.map(async (diagram) => {
            const config = JSON.parse(diagram.config);
            const parsedCode = parseMermaidString(diagram.code);
            const { svg } = await render(
              config,
              parsedCode,
              `diagram-${diagram._id}`,
            );
            setDiagramHtml((prev) => ({ ...prev, [diagram._id]: svg }));
          }),
        );
      } catch (error) {
        console.error("Error rendering diagrams:", error);
      }
    };

    if (newGenerations.length > 0) {
      renderDiagrams();
    }
  }, [newGenerations]);

  return (
    <section className="mb-20 w-full">
      <div className="">
        <div className="relative flex h-96 w-full cursor-cell flex-col items-center justify-center overflow-hidden bg-slate-900">
          <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
          <Boxes />
          <div className="absolute left-5 top-5 z-50 flex items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              Mermaid <span className="text-[hsl(280,100%,70%)]">Mind</span>
            </Link>
          </div>
          <div className="absolute right-5 top-5 z-50 flex items-center gap-4">
            <Link
              href="/gallery"
              className="py-1 text-lg tracking-tight text-white hover:scale-105"
            >
              Public Gallary
            </Link>
          </div>
          {session ? (
            <div className="z-50 flex flex-col items-center">
              <Avatar className="cursor:pointer h-24 w-24 border-4 border-gray-200 dark:border-gray-800">
                <AvatarImage
                  alt="Mermaid Mind User"
                  src={session?.user.image ?? ""}
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <h1 className="mt-4 text-3xl font-bold text-white">
                {session?.user.name}
              </h1>
              <h1 className="mt-2 text-2xl font-bold text-white">
                {!loading &&
                  `Created ${newGenerations.length} diagram${newGenerations.length > 1 || newGenerations.length === 0 ? `s` : ``}`}
              </h1>
            </div>
          ) : (
            <div
              className="z-50 cursor-pointer"
              onClick={() => signIn("google")}
            >
              <div className="flex justify-center text-center">
                <div className="rounded-full bg-white px-5 py-2 text-black">
                  <span>Log in</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="container mt-12 w-full items-center justify-center">
          <div>
            {session && loading ? (
              <div className="flex h-64 items-center justify-center">
                Loading...
              </div>
            ) : newGenerations.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {newGenerations.map((diagram) => (
                  <Card
                    key={diagram._id}
                    onClick={() => handleClick(diagram)}
                    className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div
                      className=" h-64 w-full overflow-hidden"
                      style={{ aspectRatio: "500/400" }}
                      dangerouslySetInnerHTML={{
                        __html: diagramHtml[diagram._id] ?? "<p>Loading...</p>",
                      }}
                    />
                    <div className="h-full bg-slate-500 p-4 text-white">
                      <h3 className="truncate text-xl font-bold">
                        {diagram.title}
                      </h3>
                      <p className="absolute right-4 top-4 z-20 m-0 w-fit truncate rounded-full bg-slate-700 bg-opacity-75 px-2 text-gray-100">
                        {calculateTimeDifference(diagram.created)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex h-32 flex-col items-center justify-center">
                <div className="space-y-4 text-center">
                  <h2 className="text-2xl font-bold">
                    You have no saved projects
                  </h2>
                  <p className="text-gray-500">
                    Your saved projects will be seen here.
                  </p>
                </div>
                <Link
                  className="mt-8 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/"
                >
                  Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
