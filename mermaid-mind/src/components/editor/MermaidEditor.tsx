import MonacoEditor, {
  type OnChange,
  type OnMount,
} from "@monaco-editor/react";
import initEditor from "monaco-mermaid";
import { useStore } from "@/store";

const MermaidEditor = () => {
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);
  const config = useStore((state) => state.config);
  const setConfig = useStore((state) => state.setConfig);
  const editorMode = useStore((state) => state.editorMode);

  const onChange: OnChange = (value) => {
    if (editorMode === "code") {
      setCode(value!);
    } else {
      setConfig(value!);
    }
  };

  const onMount: OnMount = (_, monaco) => {
    initEditor(monaco);
  };

  return (
    <MonacoEditor
      height="100%"
      language={editorMode === "code" ? "mermaid" : "json"}
      value={editorMode === "code" ? code : config}
      onChange={onChange}
      options={{
        minimap: {
          enabled: false,
        },
      }}
      onMount={onMount}
    />
  );
};

export default MermaidEditor;
