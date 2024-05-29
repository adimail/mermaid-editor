import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface CloudSaveModalProps {
  open: boolean;
  onClose: () => void;
}

export const CloudSaveModal: React.FC<CloudSaveModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save to Cloud (Comming Soon)</DialogTitle>
      <DialogContent>
        <p>You will soon be able to save your projects on cloud</p>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose} color="primary">
          Cancel
        </Button> */}
        <Button
          onClick={() => {
            onClose();
          }}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
