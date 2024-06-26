import dynamic from "next/dynamic";
import {
  AppBar,
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { IoMdMove } from "react-icons/io";
import { downloadImgAsPng, downloadImgAsSvg } from "@/utils/utils";
import { useState } from "react";
import { useStore } from "@/store";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CloudSaveModal } from "../modals";

const View = dynamic(() => import("./View"), { ssr: false });
const FullScreen = dynamic(() => import("./FullScreen"), { ssr: false });

const RightContainer = () => {
  const panZoom = useStore.use.panZoom();
  const setPanZoomEnable = useStore.use.setPanZoomEnable();

  const togglePanZoom = () => {
    setPanZoomEnable(!panZoom);
  };

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: "5px",
        overflow: "hidden",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        sx={{
          height: "48px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
        }}
        position="relative"
      >
        <ExportMenu />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton
            onClick={togglePanZoom}
            style={{ backgroundColor: panZoom ? "#e0e0e0" : "transparent" }}
          >
            <IoMdMove />
          </IconButton>
          <FullScreen />
        </Box>
      </AppBar>
      <Box sx={{ height: "calc(100% - 48px)" }}>
        <View />
      </Box>
    </Box>
  );
};

const ExportMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const open = Boolean(anchorEl);
  const onExport = async (type: string) => {
    try {
      switch (type) {
        case "png":
          await downloadImgAsPng();
          break;
        case "svg":
          await downloadImgAsSvg();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error exporting:", error);
    } finally {
      setAnchorEl(null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <Button
          endIcon={<KeyboardArrowDownRoundedIcon />}
          color="inherit"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          Export
        </Button>
        <FaCloudUploadAlt
          size={24}
          className="cursor-pointer hover:scale-105 hover:text-gray-500"
          onClick={handleModalOpen}
        />
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => onExport("png")}>
          <ListItemIcon>
            <ImageOutlinedIcon />
          </ListItemIcon>
          <ListItemText>PNG</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onExport("svg")}>
          <ListItemIcon>
            <CodeRoundedIcon />
          </ListItemIcon>
          <ListItemText>SVG</ListItemText>
        </MenuItem>
      </Menu>
      <CloudSaveModal open={modalOpen} onClose={handleModalClose} />
    </>
  );
};

export default RightContainer;
