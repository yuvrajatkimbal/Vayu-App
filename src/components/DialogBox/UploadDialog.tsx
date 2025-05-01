import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Link,
  useTheme
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import { UploadFileOutlined } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { FileFormatIcon, NMSUploadIcon } from "src/assets/svg/svg";
import DescriptionIcon from "@mui/icons-material/Description";
import TableChartIcon from "@mui/icons-material/TableChart";

export const FileUploadDialog = ({
  title,
  open,
  onClose,
  onBulkUpload
}: any) => {
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls", ".xlsx"],
      "text/csv": [".csv"]
    },
    maxSize: 100 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    }
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
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
      onClose={() => {
        setSelectedFile(null); // Reset selected file when closing the dialog
        onClose();
      }}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5]
        }
      }}
    >
      {" "}
      <DialogTitle
        sx={{
          fontFamily: "GT Walsheim Pro, sans-serif",
          fontWeight: 600,
          fontSize: "1.25rem",
          textAlign: "center",
          pb: 1
        }}
      >
        {title}
      </DialogTitle>
      
      <DialogContent
        sx={{
          pt: 0,
          minWidth: { xs: 300, md: 500 } // <-- This will ensure stable sizing
        }}
      >
        <Typography
          sx={{ color: "grey.700" }}
          variant="body2"
          textAlign="center"
        >
          You can upload file via drag and drop or by clicking the upload
          button.
        </Typography>
        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              mt: 2,
              textAlign: "center",
              borderStyle: "dashed",
              borderColor: "#1773BE",
              backgroundColor: "#ECF4FA",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
              // minHeight: 180, // Ensures size is stable
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            {/* If file is selected */}
            {selectedFile ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2
                  }}
                >
                  {selectedFile.name.endsWith(".csv") ? (
                    <DescriptionIcon sx={{ fontSize: 40, color: "#1773BE" }} />
                  ) : (
                    <TableChartIcon sx={{ fontSize: 40, color: "#1773BE" }} />
                  )}

                  {/* File name */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ wordBreak: "break-word", mt: 1 }}
                  >
                    {selectedFile.name}
                  </Typography>
                </Box>

                {/* Action buttons */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#1773BE",
                      borderColor: "#1773BE"
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent opening file picker
                      const url = URL.createObjectURL(selectedFile);
                      window.open(url, "_blank");
                    }}
                  >
                    View
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: "none", backgroundColor: "#1773BE" }}
                    onClick={(e) => {
                      // e.stopPropagation(); // prevent card click opening picker
                      // document.querySelector('input[type="file"]');
                      getRootProps();
                    }}
                  >
                    Replace
                  </Button>
                </Box>
              </>
            ) : (
              // Before file is uploaded
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 1
                  }}
                >
                  <NMSUploadIcon sx={{ paddingRight: "8px" }} />
                  <Typography
                    color="primary"
                    fontWeight="bold"
                    sx={{ color: "#1773BE", pl: 1 }}
                  >
                    Upload file
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  Max file size: 100MB
                  <br />
                  Supported formats: CSV, XLSX
                </Typography>
              </>
            )}
          </Card>

          {/* Instruction & Download Sample - Show only when no file is selected */}
          {!selectedFile && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={2}
            >
              <Typography variant="body2" color="text.secondary">
                File should contain Meter ID, Meter Number and Command
              </Typography>
              <Button
                variant="text"
                size="small"
                sx={{
                  color: "#1773BE",
                  textTransform: "none",
                  "&:hover": { textDecoration: "underline" },
                  pr: 2
                }}
                onClick={async () => {
                  const fileUrl =
                    "https://present-blue-antlion.myfilebase.com/ipfs/QmSF1xjA2auTh1qPzST69J1QX1nF8Vbysa6UjVdx6TWw43";
                  const response = await fetch(fileUrl);

                  if (response.ok) {
                    const blob = await response.blob();
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "sample-file";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } else {
                    console.error("Failed to fetch file");
                  }
                }}
              >
                Download Sample
              </Button>
            </Box>
          )}
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          px: 2.5,
          pb: 2,
          mt: 1,
          // gap: 2,
          alignItems: "center" // optional, aligns buttons vertically
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          // startIcon={<CancelIcon />}
          sx={{
            borderRadius: 0,
            textTransform: "none",
            px: 4
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onBulkUpload}
          variant="outlined"
          // startIcon={<UploadFileOutlined />}
          sx={{
            background: "#1773BA",
            color: "#fff",
            borderRadius: 0,
            px: 4,
            textTransform: "none",
            // boxShadow: "0px 4px 14px rgba(99, 102, 241, 0.3)", // You can tweak this shadow if needed
            "&:hover": {
              background: "#1773BE"
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
