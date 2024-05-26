"use client";

import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import Mermaid from "./Mermaid";
import { markdown, mermaid } from "./example";
import { useEditorType } from "@/providers/editor";
import MDEditor from "@uiw/react-md-editor";

const MermaidEditor = () => {
  const [EditorCode, setEditorCode] = useState(mermaid);
  const [isClient, setIsClient] = useState(false);
  const { editorType } = useEditorType();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (editorType == "mermaidJS") {
      setEditorCode(mermaid);
    } else {
      setEditorCode(markdown);
    }
  }, [editorType]);

  const ChangeEditorCode = () => {
    setEditorCode(EditorCode);
  };

  if (editorType === "mermaidJS") {
    return (
      <div className="mt-10 flex h-auto w-full flex-col px-3 text-black md:h-[600px] md:flex-row">
        <div className="flex h-[300px] flex-col p-4 md:h-full md:w-1/2">
          <textarea
            className="font-code w-full flex-grow resize-none border"
            value={EditorCode}
            onChange={(e) => setEditorCode(e.target.value)}
            placeholder="Enter Mermaid.js code"
          />
          <div className="mt-2 flex w-full space-x-2 overflow-hidden rounded-md bg-slate-600 px-3 py-2">
            <button
              onClick={ChangeEditorCode}
              className="bg-green-500 px-4 py-1 text-white"
            >
              Refresh Diagram
            </button>
            <button className="bg-blue-500 px-4 py-1 text-white">
              Download Diagram
            </button>
          </div>
        </div>
        <div className="flex h-[300px] p-4 md:h-full md:w-1/2">
          <div className="h-full w-full overflow-hidden border bg-white">
            {editorType === "mermaidJS" ? (
              <Draggable>
                <div className="h-full cursor-pointer active:cursor-move">
                  {isClient && <Mermaid chart={EditorCode} />}
                </div>
              </Draggable>
            ) : (
              <MDEditor.Markdown
                source={EditorCode}
                style={{ whiteSpace: "pre-wrap" }}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="mt-16">
        <MDEditor
          value={EditorCode}
          onChange={ChangeEditorCode}
          className="h-screen"
        />
      </div>
    );
};

export default MermaidEditor;
