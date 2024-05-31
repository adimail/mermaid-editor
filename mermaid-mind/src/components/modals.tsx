import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const isFormValid = () => {
    return (
      projectTitle.trim().length > 4 && projectDescription.trim().length > 0
    );
  };

  const handleSubmit = () => {
    setLoading(true);

    const projectData = {
      userID: session?.user.id,
      userName: session?.user.name,
      userProfile: session?.user.image,
      title: projectTitle,
      description: projectDescription,
      code: getJsonData().code,
      config: getJsonData().config,
      public: publicDiagram,
      anonymous: stayAnonymous,
      created: new Date().toLocaleDateString(),
    };

    fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Project saved successfully");
          toast({
            title: "Success",
            description: "Project saved sucessfully",
            duration: 5000,
          });
          onClose();
        } else {
          console.error("Error saving project");
          toast({
            title: "Success",
            description: "Error saving project",
            duration: 5000,
          });
        }
      })
      .catch((error) => {
        console.error("Error saving project:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
