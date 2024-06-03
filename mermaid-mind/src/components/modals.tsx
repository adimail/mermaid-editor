import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Box,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { getJsonData } from "@/store";
import { parse, render } from "@/utils/mermaid"; // Assuming these are available
import { parseMermaidString } from "@/utils/utils";

const MAX_TITLE_LENGTH = 50;
const MAX_DESC_LENGTH = 500;

interface CloudSaveModalProps {
  open: boolean;
  onClose: () => void;
}

export const CloudSaveModal: React.FC<CloudSaveModalProps> = ({
  open,
  onClose,
}) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [publicDiagram, setPublicDiagram] = useState(true);
  const [stayAnonymous, setStayAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const [isDiagramValid, setIsDiagramValid] = useState(true);

  const isFormValid = () => {
    return (
      projectTitle.trim().length > 4 &&
      projectDescription.trim().length > 0 &&
      isDiagramValid
    );
  };

  useEffect(() => {
    const validateDiagram = async () => {
      try {
        const jsonData = getJsonData();
        await parse(parseMermaidString(jsonData.code));
        // JSON.parse(jsonData.config);
        setIsDiagramValid(true);
      } catch (error) {
        console.error("Validation Error: ", error);
        setIsDiagramValid(false);
      }
    };

    if (open) {
      validateDiagram();
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const jsonData = getJsonData();
      await parse(parseMermaidString(jsonData.code));
      JSON.parse(jsonData.config);
      setIsDiagramValid(true);

      const projectData = {
        userID: session?.user.id,
        userName: session?.user.name,
        userProfile: session?.user.image,
        title: projectTitle,
        description: projectDescription,
        code: jsonData.code,
        config: jsonData.config,
        public: publicDiagram,
        anonymous: stayAnonymous,
        created: new Date().toLocaleDateString(),
      };

      const response = await fetch("/api/projects/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        console.log("Project saved successfully");
        onClose();
      } else {
        console.error("Error saving project");
      }
    } catch (error) {
      console.error("Validation or Save Error: ", error);
      setIsDiagramValid(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save your project</DialogTitle>
      {session ? (
        <>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Project Name"
              fullWidth
              required
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              inputProps={{ maxLength: MAX_TITLE_LENGTH }}
              helperText={`${projectTitle.length}/${MAX_TITLE_LENGTH} characters`}
            />
            <TextField
              margin="dense"
              required
              label="Project Description"
              fullWidth
              multiline
              rows={4}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              inputProps={{ maxLength: MAX_DESC_LENGTH }}
              helperText={`${projectDescription.length}/${MAX_DESC_LENGTH} characters`}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={publicDiagram}
                  onChange={(e) => setPublicDiagram(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Tooltip
                  title={
                    publicDiagram
                      ? "This project will be visible to everyone"
                      : "This project will be private"
                  }
                >
                  <span>Save diagram in public gallery</span>
                </Tooltip>
              }
            />
            {publicDiagram && (
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stayAnonymous}
                      onChange={(e) => setStayAnonymous(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Tooltip
                      title={
                        stayAnonymous
                          ? "Your name will not be shown in public gallery"
                          : "Your name will be shown in public gallery"
                      }
                    >
                      <span>Stay anonymous</span>
                    </Tooltip>
                  }
                />
              </Box>
            )}
            {!isDiagramValid && (
              <Box sx={{ color: "red", padding: 2 }}>
                There are syntax errors in your diagram code. Please fix them
                before saving.
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!isFormValid() || loading}
            >
              {loading ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </DialogActions>
        </>
      ) : (
        <DialogContent>
          <p>Please sign in to save your projects</p>
        </DialogContent>
      )}
    </Dialog>
  );
};
