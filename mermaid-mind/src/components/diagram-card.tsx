import { useState, useEffect } from "react";
import { Project, DiagramHtml } from "@/types/types";
import { calculateTimeDifference, parseMermaidString } from "@/utils/utils";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { render } from "@/utils/mermaid";
import { FaShareAlt, FaCheck } from "react-icons/fa";

interface CardProps {
  diagrams: Project[];
}

export const DiagramCard: React.FC<CardProps> = ({ diagrams }) => {
  const [diagramHtml, setDiagramHtml] = useState<DiagramHtml>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagrams = async () => {
      try {
        const renderedDiagrams = await Promise.all(
          diagrams.map(async (diagram) => {
            const config = JSON.parse(diagram.config);
            const parsedCode = parseMermaidString(diagram.code);
            const { svg } = await render(
              config,
              parsedCode,
              `diagram-${diagram._id}`,
            );
            return { id: diagram._id, svg };
          }),
        );
        const newDiagramHtml = renderedDiagrams.reduce(
          (acc, { id, svg }) => ({ ...acc, [id]: svg }),
          {},
        );
        setDiagramHtml(newDiagramHtml);
      } catch (error) {
        console.error("Error rendering diagrams:", error);
      }
    };

    if (diagrams.length > 0) {
      renderDiagrams();
    }
  }, [diagrams]);

  const copyToClipboard = (diagram: Project) => {
    if (diagram) {
      navigator.clipboard
        .writeText(`https://mermaid-mind.vercel.app/gallery/${diagram._id}`)
        .then(() => setCopiedId(diagram._id))
        .catch((error) => console.error("Error copying to clipboard:", error));

      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {diagrams.map((diagram) => (
        <div
          key={diagram._id}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 shadow-md duration-300 ease-in-out hover:shadow-xl"
        >
          <div className="h-64 w-full overflow-hidden bg-gray-200">
            <Link
              className="h-full w-full cursor-pointer"
              href={`/gallery/${diagram._id}`}
              style={{ aspectRatio: "500/400" }}
              dangerouslySetInnerHTML={{
                __html:
                  diagramHtml[diagram._id] ??
                  "<p class='text-center mt-24'>Loading...</p>",
              }}
            />
          </div>
          <div className="bg-white p-4">
            <div className="flex items-center gap-3">
              <Avatar className="border border-gray-300 shadow-md">
                <AvatarImage
                  alt={`Avatar of ${diagram.userName}`}
                  src={diagram.userProfile}
                />
                <AvatarFallback>{diagram.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="truncate">
                <div className="flex-1">
                  <h3 className="truncate text-lg font-semibold">
                    {diagram.title}
                  </h3>
                  <p className="text-sm text-gray-500">{diagram.userName}</p>
                </div>
              </div>
            </div>
            <p className="mt-2 flex items-center justify-between text-sm text-gray-400">
              {calculateTimeDifference(diagram.created)}
              {copiedId === diagram._id ? (
                <div className="flex items-center gap-2 text-sm">
                  Copied to clipboard
                  <FaCheck color="green" />
                </div>
              ) : (
                <FaShareAlt
                  size={20}
                  onClick={() => copyToClipboard(diagram)}
                  className="cursor-pointer transition-all ease-in-out hover:scale-105 hover:text-blue-700"
                />
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
