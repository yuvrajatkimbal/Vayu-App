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
import { CreateUserDialog } from "src/components/DialogBox/CreateUserDialog";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { CreateUserGroupDialog } from "src/components/DialogBox/CreateUserGroupDialog";

export default function FieldUserGroups() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 10
  });
  const [isSelectionEnabled, setIsSelectionEnabled] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  // const { data, loading } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 500,
  //   maxColumns: 6,
  // });

  const [tableRows, setTableRows] = useState([
    {
      id: 1,
      groupCode: "CR-43A29F",
      groupName: "Field Users",
      totalUsers: 2,
      createdOn: "23/01/2025 11:52 AM",
      status: "Active"
    },
    {
      id: 2,
      groupCode: "CR-8C7B2C",
      groupName: "Staging",
      totalUsers: 1,
      createdOn: "10/01/2025 04:55 PM",
      status: "Active"
    },
    {
      id: 3,
      groupCode: "CR-952909",
      groupName: "Development",
      totalUsers: 0,
      createdOn: "21/08/2024 12:11 PM",
      status: "Active"
    },
    {
      id: 4,
      groupCode: "CR-4A3E0C",
      groupName: "TEST GROUP",
      totalUsers: 2,
      createdOn: "30/04/2024 12:08 PM",
      status: "Active"
    },
    {
      id: 5,
      groupCode: "CR-68C50F",
      groupName: "Group 1",
      totalUsers: 21,
      createdOn: "29/07/2023 02:23 PM",
      status: "Active"
    }
  ]);

  const columns = [
    { field: "groupCode", headerName: "Group Code", minWidth: 150 },
    { field: "groupName", headerName: "Group Name", minWidth: 150 },
    { field: "totalUsers", headerName: "Total Users", minWidth: 120 },
    { field: "createdOn", headerName: "Created On", minWidth: 180 },
    { field: "status", headerName: "Status", minWidth: 100 }
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitUser = (formData: any) => {
    console.log("User Data Submitted:", formData);
    // 🚀 Send formData to backend API here
    // await api.post("/users", formData)
  };

  const exportCSV = () => {
    const headers = columns.map((c) => c.headerName).join(",");
    const data = tableRows
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
      <Box display="flex" justifyContent="space-between">
        <Box>
          {/* Dialog for file upload */}
          <CreateUserGroupDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onSubmit={handleSubmitUser}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1.5}
        mt={6}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadIcon />}
          onClick={exportCSV}
        >
          Export CSV
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<GroupAddIcon />}
          onClick={handleOpenDialog}
        >
          Create User Group
        </Button>
      </Box>
      <CustomTable
        rows={tableRows}
        columns={columns}
        handleStatusChange={(id, value) => {
          const updatedRows = tableRows.map((row) =>
            row.id === id ? { ...row, status: value } : row
          );
          setTableRows(updatedRows);
        }}
        isSelectionEnabled={isSelectionEnabled}
      />
    </Box>
  );
}
