"use client";

import { useEditorType } from "@/providers/editor";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { FaMarkdown } from "react-icons/fa";
import { SiMermaid } from "react-icons/si";

export default function EditorType() {
  const { editorType, setEditorType } = useEditorType();

  const handleEditorTypeChange = (value: string) => {
    setEditorType(value);
  };

  return (
    <div>
      <ToggleGroup
        type="single"
        className="h-[5px]"
        value={editorType}
        onValueChange={handleEditorTypeChange}
      >
        <ToggleGroupItem value="mermaidJS">
          <SiMermaid size={20} />
        </ToggleGroupItem>
        <ToggleGroupItem value="markdown">
          <FaMarkdown size={20} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
