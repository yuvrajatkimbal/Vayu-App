import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";

export const FileUploadDialog = ({ open, onClose, onBulkUpload }: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadFile = () => {
    if (selectedFile) {
      // Logic to upload file (e.g., send to API)
      console.log("Uploading file:", selectedFile.name);
      onBulkUpload(selectedFile);
      onClose();
    } else {
      alert("Please select a file.");
    }
  };

  const handleDownloadSampleCSV = () => {
    // Logic to download a sample CSV
    console.log("Downloading sample CSV...");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Commands</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom>
          Please select a file to upload or download the sample CSV.
        </Typography>
        <TextField
          type="file"
          fullWidth
          onChange={handleFileChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <Box>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadSampleCSV}
            sx={{ mr: 2 }}
          >
            Download Sample CSV
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadFile}
          disabled={!selectedFile}
        >
          Upload Selected File
        </Button>
      </DialogActions>
    </Dialog>
  );
};
