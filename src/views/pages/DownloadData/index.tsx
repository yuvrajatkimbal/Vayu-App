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
    <Paper
      elevation={1}
      sx={{
        maxWidth: 900,
        margin: "60px auto",
        p: 4,
        borderRadius: 4,
        background: `linear-gradient(145deg, #1773BA70, #FFFFFFFF)`,
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
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
          onClick={()=>{}}
          variant="contained"
          // startIcon={<GroupAddIcon />}
          sx={{
            background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: "#fff",
            borderRadius: 2,
            px: 2,
            mx:4,
            mt:4,
            textTransform: "none",
            boxShadow: "0px 4px 14px rgba(99, 102, 241, 0.3)", // You can tweak this shadow if needed
            "&:hover": {
              background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
            }
          }}
        >
          Export
        </Button>
      </Grid>
    </Paper>
  );
};

export default DownloadData;
