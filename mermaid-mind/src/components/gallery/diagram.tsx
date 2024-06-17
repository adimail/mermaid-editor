"use client";

import { useState, useEffect } from "react";
import type { Project } from "@/types/types";
import CodeView from "./view";
import dynamic from "next/dynamic";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";
import { calculateTimeDifference, parseMermaidString } from "@/utils/utils";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import LoadingComponent from "@/components//loading";
import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import initEditor from "monaco-mermaid";
import { MdOutlineFileDownload } from "react-icons/md";

const FullScreen = dynamic(() => import("@/components/editor/FullScreen"), {
  ssr: false,
});

interface Props {
  diagramID: string;
}

const DiagramEditor: React.FC<Props> = ({ diagramID }) => {
  const [diagram, setDiagram] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const onMount: OnMount = (_, monaco) => {
    initEditor(monaco);
  };

  useEffect(() => {
    const fetchDiagram = async () => {
      try {
        const response = await fetch(`/api/diagrams/${diagramID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && Array.isArray(data.diagram)) {
          const fetchedDiagram = data.diagram[0];
          setDiagram(fetchedDiagram);
        } else {
          console.error("Expected an array of diagrams but received:", data);
        }
      } catch (error) {
        console.error("Error fetching diagram:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagram();
  }, [diagramID]);

  const copyToClipboard = () => {
    if (diagram) {
      navigator.clipboard
        .writeText(parseMermaidString(diagram.code))
        .then(() => setCopied(true))
        .catch((error) => console.error("Error copying to clipboard:", error));

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  if (!diagram) {
    return (
      <>
        <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-300 text-gray-900">
          <FaExclamationCircle className="mb-4 text-5xl" />
          <div className="text-center">
            <p className="mb-2 text-lg font-semibold">
              Error loading diagram {diagramID}
            </p>
            <p className="text-sm">Please try again later.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-8 p-4 md:p-8 lg:grid-cols-4">
        <div className="col-span-1 grid gap-6 md:col-span-3">
          <div className="relative aspect-[9/16] cursor-grab overflow-hidden rounded-lg border border-black bg-[#e3e3e3] shadow-xl active:cursor-grabbing md:aspect-[15/10]">
            <CodeView code={diagram.code} />
          </div>
          <div className="col-span-1 grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-[40px] w-[40px]">
                  <AvatarImage
                    src={diagram.userProfile ?? ""}
                    alt="User profile photo"
                  />
                  <AvatarFallback className="h-full w-full animate-pulse bg-gray-300">
                    <FaUser size={20} color="gray" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-3">
                  <div className="font-medium">{diagram.userName}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <MdOutlineFileDownload size={27} />
                  <span className="sr-only">Share</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <FullScreen />
                  <span className="sr-only">Full Screen</span>
                </Button>
              </div>
            </div>
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold">{diagram.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MdOutlineDateRange />
                <div>{diagram.created}</div>
                <Separator orientation="vertical" className="h-4 bg-black" />
                <div>{calculateTimeDifference(diagram.created)}</div>
              </div>
            </div>
            <div className="grid h-[500px] gap-4 rounded-lg border bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="font-medium">Diagram Code</div>
                {copied ? (
                  <div className="flex items-center gap-2 text-sm">
                    Copied to clipboard
                    <FaCheck color="green" />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={copied}
                    onClick={copyToClipboard}
                  >
                    <FaRegCopy />
                    <span className="sr-only">Copy</span>
                  </Button>
                )}
              </div>
              <MonacoEditor
                className="h-[400px]"
                language={"mermaid"}
                value={parseMermaidString(diagram.code)}
                options={{
                  minimap: {
                    enabled: false,
                  },
                  readOnly: true,
                }}
                onMount={onMount}
              />
            </div>
          </div>
        </div>
        <CardDetails diagram={diagram} />
      </div>
    </>
  );
};

interface CardDetailsProps {
  diagram: Project;
}

const CardDetails: React.FC<CardDetailsProps> = ({ diagram }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (diagram) {
      navigator.clipboard
        .writeText(`https://mermaid-mind.vercel.app/gallery/${diagram._id}`)
        .then(() => setCopied(true))
        .catch((error) => console.error("Error copying to clipboard:", error));

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <div className="flex h-fit w-full flex-col gap-2">
      <Card className="h-fit w-full">
        <CardHeader>
          <CardTitle>Diagram Details</CardTitle>
        </CardHeader>
        <Separator className="mb-3 bg-black" />
        <CardContent className="grid gap-4">
          <div className="grid gap-1 font-medium">{diagram.title}</div>
          <div className="grid gap-1">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {diagram.description}
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              <MdOutlineDateRange />
              <div>{diagram.created}</div>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div>{calculateTimeDifference(diagram.created)}</div>
          </div>
        </CardContent>
      </Card>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Share Diagram</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Share Link
            </div>
            <div className="relative flex items-center gap-2">
              <Input
                type="text"
                value={`https://mermaid-mind.vercel.app/gallery/${diagram._id}`}
                readOnly
              />
              <Button
                variant="ghost"
                size="icon"
                disabled={copied}
                onClick={copyToClipboard}
              >
                {copied ? (
                  <div className="flex items-center gap-2 text-sm">
                    <FaCheck color="green" />
                  </div>
                ) : (
                  <FaRegCopy />
                )}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagramEditor;
