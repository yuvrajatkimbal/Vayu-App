import React, { useState, useEffect } from "react";
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
    handleClose(); // Close after submit
  };

  const handleClose = () => {
    setFormData({ groupName: "", status: "Inactive" }); // Reset form on close
    onClose();
  };

  useEffect(() => {
    if (!open) {
      setFormData({ groupName: "", status: "Inactive" });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          padding: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5]
        }
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "GT Walsheim Pro, sans-serif",
          fontWeight: 600,
          fontSize: "1.25rem",
          textAlign: "center",
          pb: 1
        }}
      >
        Create a New Field Group
      </DialogTitle>

      <DialogContent
        sx={{
          pt: 0,
          minWidth: { xs: 250, md: 500 }
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "grey.700", textAlign: "center", mb: 3 }}
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
                borderRadius: 0,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "#1773be"
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.dark
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                label="Status"
                sx={{
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773be"
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.dark
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
          justifyContent: "space-between",
          px: 3,
          pb: 3,
          mt: 1,
          gap: 2
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          color="error"
          // startIcon={<CancelIcon />}
          sx={{
            borderRadius: 0,
            textTransform: "none",
            px: 3
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          // startIcon={<GroupAddIcon />}
          sx={{
            borderRadius: 0,
            textTransform: "none",
            px: 4,
            background: "#1773BE",
            color: "#fff",
            // boxShadow: "0px 4px 14px rgba(99, 102, 241, 0.3)",
            "&:hover": {
              background: "#1773BE"
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
