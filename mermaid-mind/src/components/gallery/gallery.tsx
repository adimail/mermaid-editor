"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import UserAuth from "@/components/auth";
import type { Project, SessionProps } from "@/types/types";
import DiagramLayout, { SkeletonCard } from "../diagram-card";
import { useDebounce } from "@/hooks/debounce";
import { useQuery } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fetchProjects = async () => {
  const response = await fetch("/api/projects");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.diagrams as Project[];
};

export default function GalleryPage({ session }: SessionProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const queryKey: QueryKey = ["projects"];

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: diagrams = [], isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: fetchProjects,
  }) as { data: Project[]; isLoading: boolean };

  const filteredDiagrams = useMemo(() => {
    return diagrams.filter((diagram: Project) =>
      Object.values(diagram).some((value: any) =>
        value
          .toString()
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()),
      ),
    );
  }, [diagrams, debouncedSearchQuery]);

  const sortedDiagrams = useMemo(() => {
    return sortOrder === "newest"
      ? [...filteredDiagrams].reverse()
      : filteredDiagrams;
  }, [filteredDiagrams, sortOrder]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    setSortOrder(value as "newest" | "oldest");
  };

  return (
    <section className="mb-20 min-h-screen w-full">
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

        <div className="container mt-5 w-full items-center justify-center">
          {!isLoading ? (
            sortedDiagrams && (
              <p className="py-3 text-sm">
                Fetched {sortedDiagrams.length} diagrams
              </p>
            )
          ) : (
            <p>Loading diagrams...</p>
          )}
          <div className="mb-4 flex flex-col justify-between md:flex-row">
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Search..."
              className="mb-2 w-full rounded-3xl border border-gray-300 px-4 py-2 md:w-[300px]"
            />
            <Select onValueChange={handleSelectChange} defaultValue="newest">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isLoading ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div>
              {sortedDiagrams.length > 0 ? (
                <DiagramLayout diagrams={sortedDiagrams} />
              ) : (
                <p>No projects found for &quot;{searchQuery}&quot;</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
