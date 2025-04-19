import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Collapse,
  Paper
} from "@mui/material";
import { DataGrid, GridToolbar, GridPaginationModel } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Table from "src/components/Table/Table";
import CustomTable from "src/components/Table/Table";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FileUploadDialog } from "src/components/DialogBox/UploadDialog";

const columns = [
  { field: "meterNumber", headerName: "Meter Number", width: 150 },
  { field: "commandType", headerName: "Command Type", width: 180 },
  { field: "commandValue", headerName: "Command Value", width: 140 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "syncStatus", headerName: "Sync Status", width: 120 },
  { field: "createdOn", headerName: "Created On", width: 180 },
  { field: "userGroup", headerName: "User Group", width: 120 },
  { field: "groupCode", headerName: "Group Code", width: 120 }
];

const rows = Array.from({ length: 665 }).map((_, idx) => ({
  id: idx + 1,
  meterNumber: `AKL028625${idx % 10}`,
  commandType: "GetDailyLoadProfile",
  commandValue: "2025-03-07",
  meterStatus: "Expired",
  syncStatus: "Cancelled",
  createdOn: "28/03/2025 05:08 PM",
  userGroup: "Group 1",
  groupCode: "CR-68C50F"
}));

export default function Commands() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 10
  });

  // const { data, loading } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 500,
  //   maxColumns: 6,
  // });

  // const rows = [
  //   { id: 1, name: "Alice", age: 25, city: "New York" },
  //   { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  //   { id: 3, name: "Charlie", age: 28, city: "Chicago" },
  //   { id: 4, name: "David", age: 22, city: "San Francisco" },
  //   { id: 5, name: "Emma", age: 29, city: "Austin" },
  //   { id: 6, name: "Frank", age: 26, city: "Denver" },
  // ];

  const columns = [
    { field: "id", headerName: "ID", minWidth: 70 },
    { field: "meterNumber", headerName: "Meter Number", minWidth: 150 },
    { field: "commandType", headerName: "Command Type", minWidth: 180 },
    { field: "commandValue", headerName: "Command Value", minWidth: 150 },
    { field: "meterStatus", headerName: "Status", minWidth: 100 },
    { field: "syncStatus", headerName: "Sync Status", minWidth: 130 },
    { field: "createdOn", headerName: "Created On", minWidth: 180 },
    { field: "userGroup", headerName: "User Group", minWidth: 120 },
    { field: "groupCode", headerName: "Group Code", minWidth: 150 }
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const handleBulkCancelCommands = () => {
    setDialogTitle("Bulk Cancel Commands");
    setOpenDialog(true);
  };

  const handleBulkUploadCommands = () => {
    setDialogTitle("Bulk Upload Commands");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleBulkUpload = (file: File) => {
    console.log("Bulk Upload File: ", file);
    // Handle the bulk upload logic here
  };
  const exportCSV = () => {
    const headers = columns.map((c) => c.headerName).join(",");
    const data = rows
      .map((row) => columns.map((col) => row[col.field]).join(","))
      .join("\n");
    const blob = new Blob([`${headers}\n${data}`], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    link.click();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2} mt={6}>
        <Typography variant="h6"></Typography>
        <Box>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: 2 }}
            onClick={handleBulkCancelCommands}
          >
            Bulk Cancel Commands
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleBulkUploadCommands}
          >
            Bulk Upload Commands
          </Button>

          {/* Dialog for file upload */}
          <FileUploadDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onBulkUpload={handleBulkUpload}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6"></Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadIcon />}
          onClick={exportCSV}
        >
          Export CSV
        </Button>
      </Box>
      <CustomTable rows={rows} columns={columns} />
    </Box>
  );
}
