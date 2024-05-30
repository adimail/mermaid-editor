"use client";

import { useState, useEffect } from "react";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { render, parse } from "@/utils/mermaid";
import { calculateTimeDifference } from "@/utils/utils";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import UserAuth from "@/components/auth";
import { Session } from "next-auth";
import { motion } from "framer-motion";
import { useToast } from "../ui/use-toast";

interface Project {
  _id: string;
  userID: string;
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

type DiagramHtml = Record<string, string>;

interface SessionProps {
  session: Session | null;
}

export default function GalleryPage({ session }: SessionProps) {
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
    fetch("/api/projects")
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
          <div className="absolute right-5 top-5 z-50 flex items-center gap-4">
            <UserAuth session={session} />
          </div>
          <h1 className={cn("relative z-20 text-xl text-white md:text-4xl")}>
            Public gallery of Mermaid Diagrams
          </h1>
          <p className="relative z-20 mt-2 text-center text-neutral-300">
            Browse for inspirations and add yours as well
          </p>
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
                      <motion.div
                        key={diagram._id}
                        onClick={() => handleClick(diagram)}
                        className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                      >
                        <div
                          className="size-fit h-64 w-full overflow-hidden bg-slate-300"
                          style={{ aspectRatio: "500/400" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              diagramHtml[diagram._id] ?? "<p>Loading...</p>",
                          }}
                        />
                        <div className="absolute left-4 top-4 z-20">
                          <motion.div
                            className="avatar-container"
                            initial={{ y: 0, opacity: 1 }}
                            whileHover={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Avatar className="border-2 border-white shadow-lg dark:border-gray-950">
                              <AvatarImage
                                alt={`Avatar of ${diagram.userName}`}
                                src={diagram.userProfile}
                              />
                              <AvatarFallback>
                                {diagram.userName[0]}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                        </div>
                        <div className="flex h-full w-full bg-slate-500 p-4 text-center text-white">
                          <h3 className="truncate text-xl font-bold">
                            {diagram.title}
                          </h3>
                          <div className="absolute right-4 top-4 z-20">
                            <motion.p
                              className="timestamp-container m-0 w-fit truncate rounded-full bg-slate-700 bg-opacity-75 px-2 text-gray-100"
                              initial={{ y: 0, opacity: 1 }}
                              whileHover={{ y: -20, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {calculateTimeDifference(diagram.created)}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
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
