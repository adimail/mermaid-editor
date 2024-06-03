"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Boxes } from "@/components/ui/background-boxes";
import { signIn } from "next-auth/react";
import { Project, SessionProps } from "@/types/types";
import DiagramLayout, { SkeletonCard } from "../diagram-card";

export default function Results({ session }: SessionProps) {
  const [newGenerations, setNewGenerations] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!session) return;

    const url = `/api/projects/${session?.user.id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data && Array.isArray(data.diagrams)) {
        setNewGenerations(data.diagrams.reverse());
      } else {
        console.error("Expected an array of diagrams but received:", data);
      }
    } catch (error: any) {
      console.error("Error fetching new generations:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="mb-20 min-h-screen w-full">
      <div>
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
              Public Gallery
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
              <h1 className="mt-2 text-lg font-bold text-white">
                {!loading &&
                  `Created ${newGenerations.length} diagram${newGenerations.length !== 1 ? "s" : ""}`}
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
          {loading ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : newGenerations.length > 0 ? (
            <DiagramLayout diagrams={newGenerations} />
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
    </section>
  );
}
