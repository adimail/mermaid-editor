"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { ContextStore } from "@uiw/react-md-editor";
import { useEditorType } from "@/providers/editor";
import { useEffect } from "react";
import { markdown, mermaid } from "./example";

import LeftContainer from "./editor/LeftContainer";
import RightContainer from "./editor/RightContainer";

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
          <LeftContainer />
        </div>
        <div className="flex h-[300px] flex-col p-4 md:h-full md:w-1/2">
          <RightContainer />
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
