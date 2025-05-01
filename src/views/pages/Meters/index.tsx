import React, { useEffect, useState } from "react";
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
// import { FileUploadDialog } from "src/components/DialogBox/UploadDialog";
import * as XLSX from "xlsx";
import { FileUploadDialog } from "src/components/DialogBox/UploadDialog";
import { setPageTitle } from "src/reducers/common";
import { setLocalStorage } from "src/utils/helper";
import { useDispatch } from "react-redux";
import { UploadIcon, VayuBulkUploadIcon } from "src/assets/svg/svg";
import { CloudUpload } from "@mui/icons-material";

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

export default function Meters() {
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
  const dispatch = useDispatch();

  const handleBulkCancelCommands = () => {
    setDialogTitle("Bulk Upload");
    setOpenDialog(true);
  };

  const handleBulkUploadCommands = () => {
    setDialogTitle("Bulk Upload");
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

  const exportExcel = () => {
    // Create headers
    const headers = columns.map((c) => c.headerName);

    // Create data rows
    const data = rows.map((row) => columns.map((col) => row[col.field]));

    // Combine headers and data
    const worksheetData = [headers, ...data];

    // Create worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Export to file
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={1.5} mt={6}>
        <Typography variant="h6"></Typography>
        <Box>
          <Button
            variant="outlined"
            size="small"
            // startIcon={<VayuBulkUploadIcon />}
            onClick={handleBulkUploadCommands}
          >
            Bulk Upload
          </Button>
        </Box>
        {/* Dialog for file upload */}
        <FileUploadDialog
          title={dialogTitle}
          open={openDialog}
          onClose={handleCloseDialog}
          onBulkUpload={handleBulkUpload}
        />
      </Box>

      <CustomTable rows={rows} columns={columns} />
    </Box>
  );
}
