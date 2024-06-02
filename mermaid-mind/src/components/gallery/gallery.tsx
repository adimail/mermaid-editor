"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import UserAuth from "@/components/auth";
import { Project, SessionProps } from "@/types/types";
import { DiagramCard } from "../diagram-card";

export default function GalleryPage({ session }: SessionProps) {
  const [newGenerations, setNewGenerations] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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
          const fetchedDiagram = data.diagrams.reverse();
          setNewGenerations(fetchedDiagram);
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
            <UserAuth session={session} />
          </div>
          <h1 className={cn("relative z-20 text-xl text-white md:text-4xl")}>
            Public gallery of Mermaid Diagrams
          </h1>
          <p className="relative z-20 mt-2 text-center text-neutral-300">
            Browse for diagram inspirations and add yours
          </p>
        </div>

        <div className="container mt-12 w-full items-center justify-center">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              Loading...
            </div>
          ) : (
            <div>
              {newGenerations.length > 0 ? (
                <DiagramCard diagrams={newGenerations} />
              ) : (
                <p>No projects found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
