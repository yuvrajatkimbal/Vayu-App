import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import { UploadFileOutlined } from "@mui/icons-material";

export const FileUploadDialog = ({ open, onClose, onBulkUpload }: any) => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleUploadFile = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      onBulkUpload(selectedFile);
      onClose();
    } else {
      alert("Please select a file.");
    }
  };

  const handleDownloadSampleCSV = () => {
    const sampleData = `Name,Email,Phone\nJohn Doe,john@example.com,1234567890\nJane Smith,jane@example.com,9876543210`;
    const blob = new Blob([sampleData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
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
          fontSize: "1.25rem"
        }}
      >
        Upload Commands
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Typography
          variant="body2"
          sx={{ mb: 2, fontFamily: "GT Walsheim Pro, sans-serif" }}
        >
          Drag and drop a CSV file or click to select manually.
        </Typography>

        <Box
          component="label"
          // htmlFor="upload-csv"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 120,
            border: `2px dashed ${
              isDragOver ? theme.palette.primary.main : theme.palette.divider
            }`,
            borderRadius: "12px",
            cursor: "pointer",
            backgroundColor: isDragOver
              ? theme.palette.action.selected
              : theme.palette.action.hover,
            mb: 2,
            textAlign: "center",
            color: theme.palette.text.secondary,
            fontFamily: "GT Walsheim Pro, sans-serif",
            transition: "all 0.2s ease-in-out"
          }}
        >
          <input
            id="upload-csv"
            type="file"
            accept=".csv"
            hidden
            onChange={handleFileChange}
          />
          <Typography variant="body2">
            {selectedFile
              ? selectedFile.name
              : "Drop file here or click to upload"}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadSampleCSV}
          sx={{ fontFamily: "GT Walsheim Pro, sans-serif", mb: 1 }}
        >
          Download Sample CSV
        </Button>
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
          onClick={handleUploadFile}
          variant="contained"
          startIcon={<UploadFileOutlined />}
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
