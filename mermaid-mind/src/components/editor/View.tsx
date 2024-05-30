import { useEffect, useRef, useState } from "react";
import { useDebounce } from "ahooks";
import { Box } from "@mui/material";
import { parse, render } from "@/utils/mermaid";
import svgPanZoom from "svg-pan-zoom";
import { useStore } from "@/store";

const customMessage = `\n\nIf you are using AI, Gemini can be incorrect sometimes and may provide syntax errors. 
In such cases please manually fix them.

Common gemini syntax Errors:
- Comments (remove all comments)
- Parenthesis or single or double quotes in node titles (remove them)`;

const View = () => {
  const code = useStore.use.code();
  const config = useStore.use.config();
  const autoSync = useStore.use.autoSync();
  const updateDiagram = useStore.use.updateDiagram();
  const panZoom = useStore.use.panZoom();
  const pan = useStore.use.pan?.();
  const zoom = useStore.use.zoom?.();
  const setPanZoom = useStore.use.setPanZoom();
  const setUpdateDiagram = useStore.use.setUpdateDiagram();
  const setSvg = useStore.use.setSvg();
  const setValidateCodeState = useStore.use.setValidateCode();
  const setValidateConfigState = useStore.use.setValidateConfig();

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
        errorMessage = `Syntax error: ${error.message} ${customMessage}`;
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
    renderDiagram(validateCode, validateConfig);
  }, [validateCode, validateConfig, panZoom]);

  useEffect(() => {
    if (autoSync || updateDiagram) {
      setValidateCodeAndConfig(debounceCode, debounceConfig);
      if (updateDiagram) setUpdateDiagram(false);
    }
  }, [debounceCode, debounceConfig, autoSync, updateDiagram]);

  const timer = useRef<number>();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (panZoom && pzoom.current) {
        if (timer.current) clearTimeout(timer.current);
        timer.current = undefined;
      }
    });
  }, []);

  return (
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
  );
};

export default View;
