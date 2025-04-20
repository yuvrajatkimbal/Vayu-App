import {
  Box,
  Button,
  IconButton,
  Typography,
  Drawer,
  Divider
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CloseIcon, RightIcon } from "src/assets/svg/svg";
import { useState } from "react";
import { styled } from "@mui/material/styles";

import { Clear, CropSquareSharp } from "@mui/icons-material";
import { showToast } from "src/customHooks/ToastEmitter";
// import { useToasts } from "react-toast-notifications";
import {toast} from 'react-hot-toast';

interface CustomDrawerProps {
  toggleDrawer?: () => void;
  open?: boolean;
  title?: string;
  children: React.ReactNode; // Allows any renderable content
  buttonText?: string;
  onApply?: () => void;
  onCancel?: () => void;
  isApply?: boolean;
  isCancel?: boolean;
  isDisabled?: any;
  isApplyDisabled?: boolean;
}

const DrawerWrapper = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "400px",
    padding: "0rem 0rem",
    [theme.breakpoints.up("lg")]: {
      width: "480px",
      padding: "0rem 0rem"
    }
  }
}));

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  toggleDrawer,
  open,
  title,
  buttonText,
  onApply,
  onCancel,
  children,
  isApply,
  isDisabled,
  isApplyDisabled,
  isCancel
}) => {
  const theme = useTheme();
  // const { addToast } = useToasts();

  const showToastMsg = () => {
    toast.success("Filter Cleared");
  };

  return (
    <DrawerWrapper
      open={open}
      onClose={toggleDrawer}
      anchor={"right"}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.8)"
        }
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          mt={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography sx={{ fontSize: "20px", pl: 2, fontWeight: 500 }}>
            {title}
          </Typography>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              "&:hover": {
                color: "red", // change this to your desired hover color
                backgroundColor: "#1773BE" // subtle background on hover
              },
              mr: 2,
              padding: "8px" // controls splash size indirectly
            }}
            disableRipple={false} // make sure ripple is enabled
          >
            <CloseIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: -2, mt: 2 }} />
        <Box
          my={4}
          // mt={2}

          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1
          }}
        >
          {children}
        </Box>
        <Divider sx={{ mb: 0, mt: 2 }} /> {/*divider*/}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: "1rem",
            display: "flex",
            justifyContent: `end`,
            alignItems: "center"
          }}
        >
          <Box sx={{ display: "flex", gap: "12px", mx: 2, mb: 2 }}>
            {" "}
            {/*gap between the buttons */}
            {isCancel && (
              <IconButton
                sx={{
                  cursor: isDisabled ? "not-allowed !important" : "pointer",
                  padding: 0
                }}
                onClick={() => {
                  onCancel();
                  showToastMsg();
                }}
                disabled={isDisabled}
              >
                <Button
                  variant="contained"
                  // className="filter-button"
                  disabled={isDisabled}
                  sx={{
                    borderRadius: "4px",
                    background: theme.colors.alpha.trueWhite[100],
                    color: theme.colors.alpha.danger[100],
                    border: `1px solid ${theme.colors.alpha.danger[100]}`,
                    fontSize: "16px",
                    fontWeight: "500",
                    // marginRight: "12px",
                    padding: "6px 16px",
                    "&:hover": !isDisabled && {
                      backgroundColor: "#FFDBD8",
                      color: theme.colors.alpha.danger[100],
                      border: `1px solid ${theme.colors.alpha.danger[100]}`
                    }
                  }}
                >
                  {"Clear Filters"}
                </Button>
              </IconButton>
            )}
            {isApply && (
              <IconButton
                sx={{
                  cursor: isApplyDisabled
                    ? "not-allowed !important"
                    : "pointer",
                  padding: 0
                }}
                onClick={onApply}
                disabled={isApplyDisabled}
              >
                <Button
                  variant="contained"
                  // disabled={isApplyDisabled}
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: isApplyDisabled
                      ? "rgba(23, 115, 190, 0.4)" // light grey for disabled
                      : "rgba(23, 115, 190, 1)",
                    color: "#ffffff",
                    border: `1px solid ${
                      isApplyDisabled
                        ? "rgba(23, 115, 190, 0.4)" // light grey for disabled
                        : "rgba(23, 115, 190, 1)"
                    }`,
                    fontSize: "16px",
                    fontWeight: "500",
                    padding: "6px 16px",
                    "& .MuiButton-endIcon": {
                      marginLeft: 1
                    },
                    "&.Mui-disabled": {
                      cursor: "not-allowed" // explicitly override MUI's default
                    },
                    "&:hover": !isApplyDisabled && {
                      backgroundColor: "rgba(23, 115, 190, 1)",
                      color: "#ffffff",
                      border: `1px solid ${"rgba(23, 115, 190, 1)"}`
                    },

                    pointers: isApplyDisabled ? "none" : "auto", // prevent interactions
                    cursor: isApplyDisabled
                      ? "not-allowed !important"
                      : "pointer"
                  }}
                >
                  {buttonText || "Apply"}
                </Button>
              </IconButton>
            )}
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </DrawerWrapper>
  );
};

export default CustomDrawer;
