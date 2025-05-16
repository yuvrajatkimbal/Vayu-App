import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Grid,
  InputLabel,
  Tooltip,
  useTheme
} from "@mui/material";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import React, { useState } from "react";
import { FileUploadDialog } from "../DialogBox/UploadDialog";
import {
  CloseIcon,
  NMSSearchIcon,
  NMSThreeDotsIcon,
  ThreeDotsIcon
} from "src/assets/svg/svg";
import { Height } from "@mui/icons-material";

// Ensure the props interface is defined correctly
interface FilterHeaderProps {
  isMetersPage?: boolean;
  isCommandsPage?: boolean;
  isFieldUsersPage?: boolean;
  isFieldGroupsPage?: boolean;
  dialogTitle: string;
  openDialog: boolean;
  toggleSelectionState?: () => void;
  isSelectionEnabled: boolean;
  handleCloseDialog?: () => void;
  handleBulkUploadCommands?: () => void;
  handleBulkUpload?: (file: any) => void;
  handleBulkCancelCommands?: () => void;
  exportCSV?: () => void;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  isMetersPage = false,
  isCommandsPage = false,
  isFieldUsersPage = false,
  isFieldGroupsPage = false,
  dialogTitle,
  openDialog,
  toggleSelectionState,
  isSelectionEnabled,
  handleCloseDialog,
  handleBulkUploadCommands,
  handleBulkUpload,
  handleBulkCancelCommands,
  exportCSV
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const [searchValue, setSearchValue] = useState<string>("");
  const theme = useTheme();

  return (
    <Box>
      {isMetersPage && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mb={2.5}
          mt={7}
        >
          {/* Left: Search Box */}
          <Box display="flex" alignItems="center" gap={2} flex={1}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                backgroundColor: "#E3F2FD",
                border: "1px solid #111",
                height: "42px",
                width: "100%",
                maxWidth: "250px",
                borderRadius: "0px",
                overflow: "hidden"
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search with meter number"
                fullWidth
                value={""}
                onChange={(e) => {}}
                sx={{
                  backgroundColor: theme.colors.alpha.nmsPrimary[100],
                  "& .MuiOutlinedInput-root": {
                    height: "42px",
                    padding: "0",
                    fontSize: "12px",
                    "& input::placeholder": {
                      fontSize: "14px",
                      color: "#808089", // Optional: custom color
                      opacity: 1 // Ensures visibility
                    },
                    "& fieldset": {
                      border: "none"
                    }
                  }
                }}
              />

              <Button
                onClick={() => {}}
                sx={{
                  //   minWidth: "50px",
                  height: "100%",
                  backgroundColor: theme.colors.alpha.nmsPrimary[100],
                  borderLeft: "1px solid #000",
                  borderRadius: "0"
                }}
              >
                <NMSSearchIcon />
              </Button>
            </Box>
            {/* Middle: Bulk Upload */}
            <Button
              variant="contained"
              size="medium"
              onClick={handleBulkUploadCommands}
              sx={{
                height: "42px",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#0E4A7CFF",
                  color: "#fff"
                  // border: "1px solid #000"
                }
              }}
            >
              Bulk Upload
            </Button>
          </Box>

          {isSelectionEnabled ? (
            <Box
              sx={{
                border: "1px solid #DDDDE3",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
              onClick={() => {
                toggleSelectionState();
              }}
            >
              <CloseIcon style={{ color: "red" }} />
            </Box>
          ) : (
            <Menu
              menuStyle={{
                padding: "0",
                width: "150px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#fff"
              }}
              menuButton={
                <MenuButton
                  style={{
                    background: "#fff",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "50%", // Make button circular
                    padding: "10px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <NMSThreeDotsIcon />
                </MenuButton>
              }
            >
              <MenuItem
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "#000",
                  backgroundColor: "transparent",
                  borderBottom: "1px solid #eaeaea",
                  border: "1px solid black"
                }}
              >
                Download as XLSX
              </MenuItem>
              <MenuItem
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "#000",
                  backgroundColor: "transparent",
                  borderBottom: "1px solid #eaeaea",
                  border: "1px solid black",
                  borderTop: "0px"
                }}
              >
                Download as CSV
              </MenuItem>
              <MenuItem
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "#000",
                  backgroundColor: "transparent",
                  borderBottom: "1px solid #eaeaea",
                  border: "1px solid black",
                  borderTop: "0px"
                }}
                onClick={() => {
                  toggleSelectionState();
                  handleMenuClose();
                }}
              >
                Select
              </MenuItem>
            </Menu>
          )}

          {/* Dialog */}
          <FileUploadDialog
            title={dialogTitle}
            open={openDialog}
            onClose={handleCloseDialog}
            onBulkUpload={handleBulkUpload}
          />
        </Box>
      )}

      {isCommandsPage && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
          mt={6}
        >
          {/* <Button
            variant="outlined"
            size="small"
            startIcon={<FileDownloadIcon />}
            onClick={exportCSV}
          >
            Export CSV
          </Button> */}
          <Box sx={{ my: 1 }}>
            <Button
              variant="outlined"
              size="medium"
              sx={{ mr: 2, borderWidth: 1 }}
              onClick={handleBulkCancelCommands}
            >
              Bulk Cancel Commands
            </Button>
            <Button
              variant="outlined"
              size="medium"
              sx={{ borderWidth: 1 }}
              onClick={handleBulkUploadCommands}
            >
              Bulk Upload Commands
            </Button>

            {/* Dialog for file upload */}
            <FileUploadDialog
              title={dialogTitle}
              open={openDialog}
              onClose={handleCloseDialog}
              onBulkUpload={handleBulkUpload}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FilterHeader;
