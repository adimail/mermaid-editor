import { useEffect, useRef, useState } from "react";
import { useDebounce } from "ahooks";
import { parse, render } from "@/utils/mermaid";
import svgPanZoom from "svg-pan-zoom";
import { useStore } from "@/store";
import { parseMermaidString } from "@/utils/utils";

import dynamic from "next/dynamic";
import { Box, IconButton } from "@mui/material";
import { IoMdMove } from "react-icons/io";

interface CodeViewProps {
  code: string;
}

const CodeView: React.FC<CodeViewProps> = ({ code }) => {
  code = parseMermaidString(code);
  const config = useStore.use.config();
  const autoSync = useStore.use.autoSync();
  const updateDiagram = useStore.use.updateDiagram();
  const pan = useStore.use.pan?.();
  const zoom = useStore.use.zoom?.();
  const setPanZoom = useStore.use.setPanZoom();
  const setUpdateDiagram = useStore.use.setUpdateDiagram();
  const setSvg = useStore.use.setSvg();
  const setValidateCodeState = useStore.use.setValidateCode();
  const setValidateConfigState = useStore.use.setValidateConfig();
  const panZoom = useStore.use.panZoom();
  const setPanZoomEnable = useStore.use.setPanZoomEnable();

  const togglePanZoom = () => {
    setPanZoomEnable(!panZoom);
  };

  const container = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);

  const debounceCode = useDebounce(code, { wait: 300 });
  const debounceConfig = useDebounce(config, { wait: 300 });

  const [validateCode, setValidateCode] = useState("");
  const [validateConfig, setValidateConfig] = useState("");

  const pzoom = useRef<typeof svgPanZoom>();

  const setValidateCodeAndConfig = async (code: string, config: string) => {
    try {
      await parse(code);
      JSON.parse(config);
      setValidateCode(code);
      setValidateConfig(config);
      setValidateCodeState(code);
      setValidateConfigState(config);
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = `Syntax error: ${error.message}`;
      } else {
        errorMessage = "Syntax error: Unknown error";
      }
      setValidateCode(errorMessage);
      setValidateConfig(config);
      setValidateCodeState(errorMessage);
      setValidateConfigState(config);
    }
  };

  const renderDiagram = async (code: string, config: string) => {
    if (container.current && code) {
      const { svg } = await render(
        { ...JSON.parse(config) },
        code,
        "graph-div",
      );
      if (svg.length > 0) {
        handlePanZoom();
        container.current.innerHTML = svg;
        setSvg(svg);
        const graphDiv = document.querySelector<HTMLElement>("#graph-div");
        if (!graphDiv) {
          throw new Error("graph-div not found");
        }
        graphDiv.setAttribute("height", "100%");
        graphDiv.style.maxWidth = "100%";
      }
    }
  };

  const handlePanZoomChange = () => {
    if (!pzoom.current) return;
    const pan = pzoom.current.getPan();
    const zoom = pzoom.current.getZoom();
    setPanZoom({ pan, zoom });
  };

  const handlePanZoom = () => {
    if (!panZoom) return;
    pzoom.current?.destroy();
    pzoom.current = undefined;
    Promise.resolve().then(() => {
      const graphDiv = document.querySelector<HTMLDivElement>("#graph-div");
      if (!graphDiv) return;
      pzoom.current = svgPanZoom(graphDiv, {
        onPan: handlePanZoomChange,
        onZoom: handlePanZoomChange,
        controlIconsEnabled: true,
        fit: true,
        center: true,
      });
      if (pan !== undefined && zoom !== undefined && Number.isFinite(zoom)) {
        pzoom.current.zoom(zoom);
        pzoom.current.pan(pan);
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      renderDiagram(validateCode, validateConfig);
    }
  }, [validateCode, validateConfig, panZoom]);

  useEffect(() => {
    if (typeof window !== "undefined" && (autoSync || updateDiagram)) {
      setValidateCodeAndConfig(debounceCode, debounceConfig);
      if (updateDiagram) setUpdateDiagram(false);
    }
  }, [debounceCode, debounceConfig, autoSync, updateDiagram]);

  return (
    <>
      <div className="absolute flex w-full items-end justify-end p-4">
        <IconButton
          onClick={togglePanZoom}
          style={{ backgroundColor: panZoom ? "#e0e0e0" : "transparent" }}
        >
          <IoMdMove />
        </IconButton>
      </div>
      <Box ref={view} component="div" sx={{ height: "100%" }}>
        {validateCode.startsWith("Syntax error") ? (
          <Box component="div" sx={{ color: "red", padding: 2 }}>
            {validateCode}
          </Box>
        ) : (
          <Box
            id="container"
            ref={container}
            component="div"
            sx={{ height: "100%" }}
          ></Box>
        )}
      </Box>
    </>
  );
};

export default CodeView;
