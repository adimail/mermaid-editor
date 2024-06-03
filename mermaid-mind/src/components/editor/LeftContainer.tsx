import { Box } from "@mui/material";
import EditorTabs from "./EditorTabs";

const LeftContainer = () => {
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: "5px",
        overflow: "hidden",
        bgcolor: "white",
      }}
    >
      <EditorTabs />
    </Box>
  );
};

export default LeftContainer;
