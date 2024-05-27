import { useState } from "react";
import { Box, AppBar, Tabs, Tab } from "@mui/material";

import MermaidEditor from "./MermaidEditor";
import { useStore } from "@/store";
import SelectSample from "./SelectSample";

const EditorTabs = () => {
  const setEditorMode = useStore.use.setEditorMode();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setTabIndex(value);
    setEditorMode(value === 0 ? "code" : "config");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        position="relative"
      >
        <Box>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab label="code" />
            <Tab label="config" />
          </Tabs>
        </Box>
        <Box sx={{ display: "flex", gap: 1, mr: 1, alignItems: "center" }}>
          <SelectSample />
        </Box>
      </AppBar>
      <Box sx={{ flex: 1 }}>
        <MermaidEditor />
      </Box>
    </Box>
  );
};

export default EditorTabs;
