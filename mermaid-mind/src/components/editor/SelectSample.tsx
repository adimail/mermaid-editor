import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { samples } from "@/assets/sample";
import { useStore } from "@/store";

const sampleKeys = Object.keys(samples);

const SelectSample = () => {
  const setCode = useStore.use.setCode();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={onClick}
        sx={{ color: "inherit" }}
        size="small"
        endIcon={<KeyboardArrowDownRoundedIcon />}
      >
        Sample
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        {sampleKeys.map((key) => (
          <MenuItem key={key} onClick={() => setCode(samples[key] ?? "")}>
            {key}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SelectSample;
