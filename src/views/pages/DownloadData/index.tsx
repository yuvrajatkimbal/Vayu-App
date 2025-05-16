import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  TextField,
  Button,
  Paper,
  useTheme
} from "@mui/material";

const DownloadData = () => {
  const [profile, setProfile] = useState("Billing Profile");
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        mt: 8,
        border: "1px solid #000000FF",
        borderRadius: 0,
        backgroundColor: "grey.90"
      }}
    >
      <Grid container spacing={4}>
        {/* Profile Selector */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "#374151", fontWeight: 600 }}
          >
            Select Profile
          </Typography>
          <TextField
            fullWidth
            select
            value={profile}
            size="small" // <-- same height as date
            onChange={(e) => setProfile(e.target.value)}
          >
            <MenuItem value="Billing Profile">Billing Profile</MenuItem>
            <MenuItem value="Another Profile">Daily Load Profile</MenuItem>
            <MenuItem value="Another Profile">Block Load Profile</MenuItem>
          </TextField>
        </Grid>

        {/* Date Range */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "#374151", fontWeight: 600 }}
          >
            Select Date Range
          </Typography>
          <Box display="flex" gap={2}>
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              size="small" // <-- ensure matching height
            />
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              size="small" // <-- ensure matching height
            />
          </Box>
        </Grid>

        {/* Export Button */}
        <Button
          onClick={() => {}}
          variant="contained"
          size="medium"
          color="primary"
          sx={{
            color: "#fff",
            borderRadius: 0,
            border: "1px solid #1773BA",
            backgroundColor: "#1773BA",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#005597FF",
              border: "1px solid #005597FF"
            },

            px: 2,
            mx: 4,
            mt: 4
          }}
        >
          Export
        </Button>
      </Grid>
    </Box>
  );
};

export default DownloadData;
