import { Box, Dialog, IconButton, Slide } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type Ref,
} from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useStore } from "@/store";
import { MdFullscreen } from "react-icons/md";

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

Transition.displayName = "Transition";

const FullScreen = () => {
  const [open, setOpen] = useState(false);
  const svg = useStore.use.svg();
  const fullScreenView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.resolve().then(() => {
      if (svg && open && fullScreenView.current) {
        fullScreenView.current.innerHTML = svg;
        const svgDom = fullScreenView.current.querySelector("svg");
        if (!svgDom) return;
        svgDom.setAttribute("height", "100%");
        svgDom.style.maxWidth = "100%";
      }
    });
  }, [svg, open]);

  return (
    <>
      <MdFullscreen
        className="cursor-pointer"
        size={32}
        onClick={() => setOpen(true)}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <IconButton
          sx={{ position: "absolute" }}
          onClick={() => setOpen(false)}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Box sx={{ height: "100%" }} ref={fullScreenView}></Box>
      </Dialog>
    </>
  );
};

export default FullScreen;
