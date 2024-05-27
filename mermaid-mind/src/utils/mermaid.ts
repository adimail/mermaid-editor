import mermaid, { MermaidConfig } from "mermaid";

export const render = async (
  config: MermaidConfig,
  code: string,
  id: string,
) => {
  mermaid.initialize(config);
  return await mermaid.render(id, code);
};

export const parse = async (code: string) => {
  return await mermaid.parse(code);
};
