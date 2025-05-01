import { Box, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SwipperWrapperProps {
  children: ReactNode;
}

const SwipperWrapper: React.FC<SwipperWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Grid container spacing={0} columns={12} sx={{ flex: 1 }}>
        <Grid
          sx={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 4
          }}
          item
          sm={12}
          md={7}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography
              sx={{ fontSize: 28, fontWeight: "bold", color: "#1773BA" }}
            >
              Welcome to Vayu App
            </Typography>
            <Typography
              sx={{ fontSize: 16, color: "black", mt: 1, textAlign: "center" }}
            >
              Vayu is your command center — effortlessly manage users, organize
              groups, and take control with powerful, streamlined tools built
              for efficiency and scale.
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          sm={12}
          md={5}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "80vh", px: 4 }}
        >
          {children}
        </Grid>
      </Grid>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          pb: 2,
          textAlign: "center",
          // backgroundColor: '#f5f5f5',
          // borderTop: '1px solid #ddd',
          fontSize: "0.85rem",
          color: "#1773BA"
        }}
      >
        © {new Date().getFullYear()} Kimbal Pvt. Ltd. - All rights reserved.
      </Box>
    </Box>
  );
};

export default SwipperWrapper;
