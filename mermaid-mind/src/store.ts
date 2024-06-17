import { create, type StoreApi, type UseBoundStore } from "zustand";
import { formatJSON } from "./utils/utils";
import { persist } from "zustand/middleware";

export type EditorMode = "code" | "config";

export interface State {
  code: string;
  config: string;
  autoSync: boolean;
  editorMode: EditorMode;
  panZoom: boolean;
  pan?: { x: number; y: number };
  zoom?: number;
  updateDiagram: boolean;
  svg: string;
  validateCode: string;
  validateConfig: string;
}

interface Action {
  setCode: (code: string) => void;
  setConfig: (mermaid: string) => void;
  setEditorMode: (mode: EditorMode) => void;
  setAutoSync: (autoSync: boolean) => void;
  setPanZoomEnable: (enable: boolean) => void;
  setPanZoom: (panZoom: {
    pan: { x: number; y: number };
    zoom: number;
  }) => void;
  setUpdateDiagram: (isUpdate: boolean) => void;
  setSvg: (svg: string) => void;
  setValidateCode: (code: string) => void;
  setValidateConfig: (config: string) => void;
}

export const useStateStore = create<State & Action>()(
  persist(
    (set) => ({
      code: `flowchart TD
    %% Entry point
    A[User Enters]

    %% Main options
    A ===> B{{Write their own code}}
    A ===> C{{Edit existing code}}
    A ===> D{{Export Mermaid diagrams}}
    A ===> E{{Use AI to generate charts}}

    %% AI Usage Group
    subgraph AI_Usage [Using AI to Generate Charts]
        E1[Enter query] ==> E2[Copy the generated code]
        E2 ==> E3[Directly import in workspace]
    end
    E ===> AI_Usage

    %% Connections for editing and exporting
    B ===> F{{User Editor}}
    C ===> F
    F ==> G[Save Changes]
    F ==> H[Preview Diagram]
    G ==> D
    H ==> D

    %% Connections for AI to workspace
    E1 ===> I[Process query with AI]
    I ==> E2
`,
      config: formatJSON({
        theme: "default",
      }),
      autoSync: true,
      editorMode: "code",
      panZoom: true,
      updateDiagram: false,
      svg: "",
      validateCode: "",
      validateConfig: "",

      setCode: (code) => set(() => ({ code })),
      setConfig: (config) => set(() => ({ config })),
      setEditorMode: (mode) => set(() => ({ editorMode: mode })),
      setAutoSync: (autoSync) => set(() => ({ autoSync })),
      setPanZoomEnable: (enable) => set(() => ({ panZoom: enable })),
      setPanZoom: (panZoom) =>
        set(() => ({
          pan: panZoom.pan,
          zoom: panZoom.zoom,
        })),
      setUpdateDiagram: (isUpdate) => set(() => ({ updateDiagram: isUpdate })),
      setSvg: (svg) => set(() => ({ svg })),
      setValidateCode: (code) => set(() => ({ validateCode: code })),
      setValidateConfig: (config) => set(() => ({ validateConfig: config })),
    }),
    {
      name: "mermaid-storage",
      partialize: (state) => ({
        autoSync: state.autoSync,
        panZoom: state.panZoom,
      }),
    },
  ),
);

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useStore = createSelectors(useStateStore);

export const getJsonData = (): { code: string; config: string } => {
  const code = useStore.getState().validateCode;
  const config = useStore.getState().validateConfig;

  let parsedConfig = {};
  if (typeof config === "string" && config.trim() !== "") {
    try {
      parsedConfig = JSON.parse(config);
    } catch (error) {
      console.error("Error parsing config JSON:", error);
    }
  }

  return {
    code: JSON.stringify(code, null, 2),
    config: JSON.stringify(parsedConfig, null, 2),
  };
};
