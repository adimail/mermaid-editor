"use client";

import { useState, useEffect } from "react";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { render, parse } from "@/utils/mermaid";
import { calculateTimeDifference } from "@/utils/utils";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";

interface ResultsProps {
  session: Session | null;
}

interface Project {
  _id: string;
  userName: string;
  userProfile: string;
  title: string;
  description: string;
  code: string;
  config: string;
  public: boolean;
  anonymous: boolean;
  created: string;
}

interface DiagramHtml {
  [key: string]: string;
}

export default function Results({ session }: ResultsProps) {
  const [newGenerations, setNewGenerations] = useState<Project[]>([]);
  const [diagramHtml, setDiagramHtml] = useState<DiagramHtml>({});
  const [loading, setLoading] = useState(true);

  const handleClick = (code: string) => {
    navigator.clipboard
      .writeText(parseMermaidString(code))
      .then(() => {
        alert("Mermaid code copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    let url = `/api/projects`;

    if (session) {
      url = `/api/projects?userID=${session?.user.id}`;
    }
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
  }, []);

  function parseMermaidString(input: string): string {
    if (input.startsWith('"') && input.endsWith('"')) {
      input = input.slice(1, -1);
    }

    const output = input.replace(/\\n/g, "\n");
    return output;
  }

  useEffect(() => {
    newGenerations.forEach(async (diagram) => {
      try {
        const config = JSON.parse(diagram.config);
        const parsedCode = parseMermaidString(diagram.code);
        const { svg } = await render(
          config,
          parsedCode,
          `diagram-${diagram._id}`,
        );
        setDiagramHtml((prev) => ({ ...prev, [diagram._id]: svg }));
      } catch (error) {
        console.error(`Error rendering diagram ${diagram._id}:`, error);
      }
    });
  }, [newGenerations]);

  return (
    <section className="w-full">
      <div className="">
        <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden bg-slate-900">
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
          <div className="z-50 flex flex-col items-center">
            <Avatar className="h-24 w-24 border-4 border-gray-200 dark:border-gray-800">
              <AvatarImage
                alt="Mermaid Mind User"
                src={session?.user.image || ""}
              />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <h1 className="mt-4 text-3xl font-bold text-white">
              {session?.user.name}
            </h1>
            <h1 className="text-md mt-2 font-bold text-white">
              {!loading &&
                `Created ${newGenerations.length} diagram${newGenerations.length > 1 ? `s` : ``}`}
            </h1>
          </div>
        </div>

        <div className="container mt-12">
          <Tabs
            className="w-full items-center justify-center"
            defaultValue="new"
          >
            <TabsContent value="new">
              {loading ? (
                <div className="flex h-64 items-center justify-center">
                  Loading...
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {newGenerations.length > 0 ? (
                    newGenerations.map((diagram) => (
                      <Card
                        key={diagram._id}
                        onClick={() => handleClick(diagram.code)}
                        className="group relative overflow-hidden rounded-3xl border-2 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                      >
                        <Link className="absolute inset-0 z-10" href="#">
                          <span className="sr-only">View</span>
                        </Link>
                        <div
                          className="size-fit h-64 w-full overflow-hidden"
                          style={{ aspectRatio: "500/400" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              diagramHtml[diagram._id] || "<p>Loading...</p>",
                          }}
                        />
                        <div className="absolute left-4 top-4 z-20">
                          <Avatar className="border-2 border-white shadow-lg dark:border-gray-950">
                            <AvatarImage
                              alt={`Avatar of ${diagram.userName}`}
                              src={diagram.userProfile}
                            />
                            <AvatarFallback>
                              {diagram.userName[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="bg-slate-500 p-4 text-white">
                          <h3 className="text-xl font-bold">{diagram.title}</h3>
                          <p className="absolute right-4 top-4 z-20 m-0 w-fit truncate rounded-full bg-slate-700 bg-opacity-75 px-2 text-gray-100">
                            {calculateTimeDifference(diagram.created)}
                          </p>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p>No projects found</p>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
