import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  useTheme
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const userGroups = ["Admin Group", "Manager Group", "Sales Group"];
const roles = ["Field User", "Administrator"];
const userGroupNames = [
  "Field Users",
  "Staging",
  "Development",
  "Test Group",
  "Group 1"
];

export const CreateUserDialog = ({ open, onClose, onSubmit }: any) => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    mobile: "",
    password: "",
    userGroup: "",
    role: "",
    userGroupNames: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.name || !formData.password) {
      alert("Please fill all required fields");
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
          borderRadius: 2,
          p: 1,
          // background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
          // boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.1)"
        }
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.5rem",
          textAlign: "center",
          pb: 0
        }}
      >
        Create a New User
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: "grey",
            textAlign: "center",
            fontSize: "0.95rem"
          }}
        >
          Fill in the user details below to grant access and define their role.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              placeholder="john.doe@example.com"
              variant="outlined"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              sx={{
                borderRadius: 0,
                // background: "rgba(99, 102, 241, 0.06)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "#1773BA"
                  },
                  "&:hover fieldset": {
                    borderColor: "#1773BE"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1773BE"
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              placeholder="John Doe"
              variant="outlined"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              sx={{
                borderRadius: 0,
                // background: "rgba(99, 102, 241, 0.06)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "#1773BA"
                  },
                  "&:hover fieldset": {
                    borderColor: "#1773BE"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1773BE"
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              type="tel"
              inputProps={{ maxLength: 10 }}
              sx={{
                borderRadius: 0,
                // background: "rgba(99, 102, 241, 0.06)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "#1773BA"
                  },
                  "&:hover fieldset": {
                    borderColor: "#1773BE"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1773BE"
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              placeholder="Choose a password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              type="password"
              sx={{
                borderRadius: 0,
                // background: "rgba(99, 102, 241, 0.06)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "#1773BA"
                  },
                  "&:hover fieldset": {
                    borderColor: "#1773BE"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1773BE"
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              sx={{
                // background: "rgba(99, 102, 241, 0.06)",
                borderRadius: 0
              }}
            >
              <InputLabel>Select a User Group</InputLabel>
              <Select
                value={formData.userGroup}
                onChange={(e) => handleChange("userGroup", e.target.value)}
                label="Select a User Group"
                sx={{
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BA"
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BE"
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BE"
                  }
                }}
              >
                {userGroups.map((group) => (
                  <MenuItem
                    sx={{
                      borderRadius: 0,
                      "&.MuiMenuItem-root": {
                        borderRadius: 0 // Additional safeguard for the inner MenuItem class
                      }
                    }}
                    key={group}
                    value={group}
                  >
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              sx={{
                // background: "rgba(99, 102, 241, 0.06)",
                borderRadius: 0
              }}
            >
              <InputLabel>Select Role</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                label="Select Role"
                sx={{
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BA"
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BE"
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BE"
                  }
                }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              sx={{
                // background: "rgba(99, 102, 241, 0.06)",
                borderRadius: 0
              }}
            >
              <InputLabel>User Group Name</InputLabel>
              <Select
                value={formData.userGroupNames}
                onChange={(e) => handleChange("userGroupNames", e.target.value)}
                label="Select User Group Name"
                sx={{
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BA"
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BE"
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1773BE"
                  }
                }}
              >
                {userGroupNames.map((userGroupName) => (
                  <MenuItem key={userGroupName} value={userGroupName}>
                    {userGroupName}
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
          onClick={onClose}
          variant="outlined"
          // startIcon={<CancelIcon />}
          color="error"
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
          // startIcon={<PersonAddAltIcon />}
          sx={{
            background: "#1773BA",
            color: "#fff",
            borderRadius: 0,
            px: 4,
            textTransform: "none",
            // boxShadow: "0px 4px 14px rgba(99, 102, 241, 0.3)", // You can tweak this shadow if needed
            "&:hover": {
              background: "#1773BE",
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
