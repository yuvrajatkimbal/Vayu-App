import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  useTheme
} from "@mui/material";
import { setPageTitle } from "src/reducers/common";
import { useDispatch } from "react-redux";
import { setLocalStorage } from "src/utils/helper";

export default function MyProfile() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@somewhere.com");
  const [mobile, setMobile] = useState("+91 123 456 7890");
  const [password, setPassword] = useState("");

  const handleUpdate = (field: string, value: string | null) => {
    if (!value) return;
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
    else if (field === "mobile") setMobile(value);
    else if (field === "password") setPassword(value);
  };


  useEffect(() => {
    dispatch(setPageTitle("Profile"));
    setLocalStorage("title", "Profile");
  }, []);


  return (
    <Box
      // elevation={1}
      sx={{
        p: 3,
        mt: 8,
        border: "1px solid #000000FF",
        borderRadius: 0,
        backgroundColor: "grey.90"
      }}
    >
      <Typography sx={{ mb: 1}} variant="h4" fontWeight={600}>
        Update Profile
      </Typography>
      <Typography
        sx={{ mb: 4, color: "grey" }}
        variant="body1"
        fontWeight={600}
      >
        You can update your profile details here.
      </Typography>

      <Grid container spacing={4}>
        {/* Name */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Full Name
          </Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            sx={{ flex: 1 }}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: "#f9f9f9"
              }
            }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Email Address
          </Typography>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            sx={{ flex: 1 }}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: "#f9f9f9"
              }
            }}
          />
        </Grid>

        {/* Mobile */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Mobile Number
          </Typography>
          <TextField
            fullWidth
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            sx={{ flex: 1 }}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: "#f9f9f9"
              }
            }}
          />
        </Grid>

        {/* Password */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            sx={{ flex: 1 }}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: "#f9f9f9"
              }
            }}
          />
        </Grid>
        <Button
          onClick={() => {}}
          variant="contained"
          size="medium"
          color="primary"
          sx={{
            color: "#fff",
            borderRadius: 0,
            border: "1px solid #000000FF",

            px: 2,
            mx: 4,
            mt: 4
          }}
        >
          Update
        </Button>
      </Grid>
    </Box>
  );
}
