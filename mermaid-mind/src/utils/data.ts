import { useStore } from "../store";

interface StoreState {
  code: string;
  config: string;
}

export const generateJsonData = (): string => {
  const state: StoreState = useStore.getState() as StoreState;
  const { code, config } = state;

  let parsedConfig: unknown;
  try {
    parsedConfig = JSON.parse(config);
  } catch (error) {
    console.error("Failed to parse config:", error);
    parsedConfig = {};
  }

  const data = {
    code,
    config: parsedConfig,
  };

  return JSON.stringify(data);
};
