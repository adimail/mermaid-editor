import { useState, useEffect } from "react";
import { Project, DiagramHtml } from "@/types/types";
import { calculateTimeDifference, parseMermaidString } from "@/utils/utils";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";

import { render } from "@/utils/mermaid";

interface CardProps {
  diagrams: Project[];
}

export const DiagramCard: React.FC<CardProps> = ({ diagrams }) => {
  const [diagramHtml, setDiagramHtml] = useState<DiagramHtml>({});

  useEffect(() => {
    const renderDiagrams = async () => {
      try {
        await Promise.all(
          diagrams.map(async (diagram) => {
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

    if (diagrams.length > 0) {
      renderDiagrams();
    }
  }, [diagrams]);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {diagrams.map((diagram) => (
        <Link
          href={`/gallery/${diagram._id}`}
          key={diagram._id}
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
            <div className="flex items-center gap-3">
              <Avatar className="border border-white shadow-lg dark:border-gray-950">
                <AvatarImage
                  alt={`Avatar of ${diagram.userName}`}
                  src={diagram.userProfile}
                />
                <AvatarFallback>{diagram.userName[0]}</AvatarFallback>
              </Avatar>
              <h3 className="truncate text-xl font-bold">{diagram.title}</h3>
            </div>
            <p className="absolute right-4 top-4 z-20 m-0 w-fit truncate rounded-full bg-slate-700 bg-opacity-75 px-2 text-gray-100">
              {calculateTimeDifference(diagram.created)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
