import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const statusOptions = ["Active", "Inactive"];

export const CreateUserGroupDialog = ({ open, onClose, onSubmit }: any) => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    groupName: "",
    status: "Inactive"
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
          boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.1)"
        }
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.5rem",
          color: "#1e293b",
          textAlign: "center",
          pb: 0
        }}
      >
        Create a New Field Group
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: "#64748b",
            textAlign: "center",
            fontSize: "0.95rem"
          }}
        >
          Enter the group name and choose its status below.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Group Name"
              placeholder="Type a group name"
              value={formData.groupName}
              onChange={(e) => handleChange("groupName", e.target.value)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                background: "rgba(99, 102, 241, 0.06)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "#c7d2fe"
                  },
                  "&:hover fieldset": {
                    borderColor: "#6366f1"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366f1"
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              sx={{
                background: "rgba(99, 102, 241, 0.06)",
                borderRadius: 2
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                label="Status"
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#c7d2fe"
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6366f1"
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6366f1"
                  }
                }}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          px: 4,
          pb: 3,
          mt: 1,
          gap: 2
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          startIcon={<CancelIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<GroupAddIcon />}
          sx={{
            background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: "#fff",
            borderRadius: 2,
            px: 4,
            textTransform: "none",
            boxShadow: "0px 4px 14px rgba(99, 102, 241, 0.3)", // You can tweak this shadow if needed
            "&:hover": {
              background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
