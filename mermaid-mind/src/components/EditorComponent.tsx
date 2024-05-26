"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { ContextStore } from "@uiw/react-md-editor";
import { useEditorType } from "@/providers/editor";
import { useState, useEffect } from "react";
import { markdown, mermaid } from "./example";
import Draggable from "react-draggable";
import Mermaid from "./Mermaid";
import MDEditor from "@uiw/react-md-editor";

const MDEditorMD = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});
type OnChange = (
  value?: string,
  event?: React.ChangeEvent<HTMLTextAreaElement>,
  state?: ContextStore,
) => void;

export default function Home() {
  const [value, setValue] = React.useState(mermaid);
  const { editorType } = useEditorType();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (editorType == "mermaidJS") {
      setValue(mermaid);
    } else {
      setValue(markdown);
    }
  }, [editorType]);

  const onChange = React.useCallback<OnChange>((val) => {
    setValue(val ?? "");
  }, []);

  if (editorType === "mermaidJS") {
    return (
      <div className="flex h-auto w-full flex-col px-3 text-black md:h-[600px] md:flex-row">
        <div className="flex h-[300px] flex-col p-4 md:h-full md:w-1/2">
          <textarea
            className="w-full flex-grow resize-none border font-code text-sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter Mermaid.js code"
          />
          <div className="mt-2 flex w-full space-x-2 overflow-hidden rounded-md bg-slate-600 px-3 py-2">
            <button className="bg-green-500 px-4 py-1 text-white">
              Refresh
            </button>
            <button className="bg-blue-500 px-4 py-1 text-white">
              Download
            </button>
          </div>
        </div>
        <div className="flex h-[300px] p-4 md:h-full md:w-1/2">
          <div className="h-full w-full overflow-hidden border bg-white">
            {editorType === "mermaidJS" ? (
              <Draggable>
                <div className="h-full cursor-pointer active:cursor-move">
                  {isClient && <Mermaid chart={value} />}
                </div>
              </Draggable>
            ) : (
              <MDEditor.Markdown
                source={value}
                style={{ whiteSpace: "pre-wrap" }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="container" data-color-mode="light">
      <MDEditorMD style={{ width: "100%" }} value={value} onChange={onChange} />
    </main>
  );
}
