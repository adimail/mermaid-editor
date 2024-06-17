"use client";

import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface EditorTypeContextType {
  editorType: string;
  setEditorType: Dispatch<SetStateAction<string>>;
}

const EditorTypeContext = createContext<EditorTypeContextType | undefined>(
  undefined,
);

export const useEditorType = () => {
  const context = useContext(EditorTypeContext);
  if (!context) {
    throw new Error("useEditorType must be used within an EditorTypeProvider");
  }
  return context;
};

interface EditorTypeProviderProps {
  children: ReactNode;
}

export const EditorTypeProvider: React.FC<EditorTypeProviderProps> = ({
  children,
}) => {
  const [editorType, setEditorTypeState] = useState<string>("mermaidJS");

  const setEditorType = (
    newEditorType: string | ((prevState: string) => string),
  ) => {
    if (typeof newEditorType === "function") {
      setEditorTypeState((prevState) => {
        const updatedEditorType = newEditorType(prevState);
        return updatedEditorType;
      });
    } else {
      setEditorTypeState(newEditorType);
    }
  };

  return (
    <EditorTypeContext.Provider value={{ editorType, setEditorType }}>
      {children}
    </EditorTypeContext.Provider>
  );
};
