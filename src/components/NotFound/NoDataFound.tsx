import { Grid, Typography } from "@mui/material";
import React from "react";
import { NoRecordsFoundIcon } from "src/assets/svg/svg";

const NoDataFound = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1,
        display: "flex",
        flexDirection: "column", // Align items in a column
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}
    >
      <NoRecordsFoundIcon style={{ width: 50, height: 50, pb: 2 }} />
      <Typography className="f-18" sx={{ mt: 2 }}>
        {" "}
        No Records Found
      </Typography>
    </Grid>
  );
};

export default NoDataFound;
