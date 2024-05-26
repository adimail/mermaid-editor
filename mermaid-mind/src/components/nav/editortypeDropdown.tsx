"use client";

import { useEditorType } from "@/providers/editor";
import React from "react";

export default function EditorType() {
  const { editorType, setEditorType } = useEditorType();

  const handleEditorTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setEditorType(event.target.value);
  };

  return (
    <div className="hidden text-black md:block">
      <select
        name="editorType"
        value={editorType}
        onChange={handleEditorTypeChange}
        className="rind-0 rounded-sm px-2 py-1 outline-none"
      >
        <option value="mermaidJS">Mermaid JS</option>
        <option value="markdown">Markdown</option>
      </select>
    </div>
  );
}
