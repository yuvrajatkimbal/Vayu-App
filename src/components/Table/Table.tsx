import React, { useState, useMemo } from "react";
import { Collapse, TablePagination } from "@mui/material";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  TextField,
  Button,
  TableSortLabel,
  Pagination,
  Select,
  MenuItem as MuiMenuItem,
  InputLabel,
  FormControl,
  InputAdornment
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DownArrowIcon,
  UpIcon,
  VayuDownArrowIcon,
  VayuUpArrowIcon
} from "src/assets/svg/svg";

const CustomTable = ({
  rows,
  columns,
  handleStatusChange = (id, value) => {},
  isSelectionEnabled
}) => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filters state
  const [filters, setFilters] = useState<{
    [key: string]: { value: string; type: string };
  }>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColumn, setCurrentColumn] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("contains");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Handle applying the filter to the column
  const applyFilter = () => {
    if (currentColumn) {
      setFilters((prev) => ({
        ...prev,
        [currentColumn]: { value: filterValue, type: filterType }
      }));
      setAnchorEl(null); // Close the filter menu
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: { value, type: prev[field]?.type || "contains" }
    }));
  };

  const filteredRows = useMemo(() => {
    let filtered = [...rows];

    // Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      filtered = filtered.filter((row) =>
        row[field]?.toString().toLowerCase().includes(value.value.toLowerCase())
      );
    });

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [rows, sortField, sortDirection, filters]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value as string);
  };

  const sortedRows = useMemo(() => {
    if (!sortField) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const aVal = a[sortField as string];
      const bVal = b[sortField as string];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortField, sortDirection]);

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  // Pagination logic
  const paginatedRows = rows.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle page size change
  const handlePageSizeChange = (e: any) => {
    setPageSize(parseInt(e.target.value, 10));
    setCurrentPage(0); // Reset to the first page
  };

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1); // Pagination starts from 1, but we need to store 0-based index
  };

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    column: string
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentColumn(column);
    const currentFilter = filters[column];
    setFilterValue(currentFilter ? currentFilter.value : "");
    setFilterType(currentFilter ? currentFilter.type : "contains");
  };

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <Box></Box>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            maxHeight: 500,
            overflow: "auto",
            borderRadius: 0,
            border: "1px solid black",
            position: "relative",
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px"
            }
            // "&::-webkit-scrollbar-thumb": {
            //   backgroundColor: "black",
            //   borderRadius: "4px"
            // }
          }}
        >
          <Table stickyHeader sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#e0f2fe",
                  // boxShadow: "inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
                  border: "1px solid black"
                }}
              >
                {isSelectionEnabled && (
                  <TableCell
                    padding="checkbox"
                    sx={{
                      backgroundColor: "#e0f2fe",
                      borderBottom: "1px solid black"
                    }}
                  >
                    <Checkbox
                      checked={selected.length === rows.length}
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      onChange={(e) =>
                        setSelected(
                          e.target.checked ? rows.map((r) => r.id) : []
                        )
                      }
                      sx={{
                        color: "grey",
                        "&.Mui-checked": {
                          color: "#0284c7"
                        },
                        "&.MuiCheckbox-indeterminate": {
                          color: "#0284c7"
                        }
                      }}
                    />
                  </TableCell>
                )}

                {columns.map((col) =>
                  col.field === "id" ? null : (
                    <TableCell
                      key={col.field}
                      sx={{
                        fontWeight: 700,
                        textTransform: "capitalize",
                        backgroundColor: "#e0f2fe",
                        color: "#0f172a",
                        fontSize: "0.9rem",
                        letterSpacing: "0.02em",
                        borderBottom: "1px solid black",
                        minWidth: col.minWidth
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <TableSortLabel
                          active={sortField === col.field}
                          direction={
                            sortField === col.field ? sortDirection : "asc"
                          }
                          onClick={() => handleSort(col.field)}
                          sx={{
                            "& .MuiTableSortLabel-icon": {
                              color: "#38bdf8"
                            },
                            "&.Mui-active .MuiTableSortLabel-icon": {
                              color: "#0284c7"
                            }
                          }}
                        >
                          {col.headerName}
                        </TableSortLabel>

                        <IconButton
                          size="small"
                          onClick={(e) => handleClickMenu(e, col.field)}
                          sx={{
                            ml: 1,
                            color: "#0284c7",
                            "&:hover": {
                              color: "#0369a1"
                            }
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  )
                )}
                <TableCell
                  sx={{
                    backgroundColor: "#e0f2fe",
                    borderBottom: "1px solid black" // updated
                  }}
                />
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.map((row, index) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    hover
                    key={row.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f6f8fa",
                      transition: "background-color 0.3s"
                    }}
                  >
                    {isSelectionEnabled && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.includes(row.id)}
                          onChange={() => handleSelect(row.id)}
                        />
                      </TableCell>
                    )}

                    {columns.map((col) =>
                      col.field === "status" ? (
                        <TableCell key={`${row.id}-status`} align="center">
                          <FormControl size="small" fullWidth>
                            <Select
                              value={row.status ?? "Inactive"}
                              onChange={(e) =>
                                handleStatusChange(row.id, e.target.value)
                              }
                              sx={{
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                borderRadius: "0px",
                                color:
                                  row.status === "Active"
                                    ? "#117C39FF"
                                    : "#BA2222FF",
                                backgroundColor:
                                  row.status === "Active"
                                    ? "#dcfce7"
                                    : "#fee2e2",
                                height: "32px"
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    "& .MuiMenuItem-root.Mui-selected": {
                                      backgroundColor: "#1773BA",
                                      color: "white",
                                      fontWeight: "bold"
                                    },
                                    "& .MuiMenuItem-root.Mui-selected:hover": {
                                      backgroundColor: "#1773BA",
                                      color: "white"
                                    }
                                  }
                                }
                              }}
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      ) : col.field === "id" ? null : (
                        <TableCell key={`${row.id}-${col.field}`}>
                          {row[col.field]}
                        </TableCell>
                      )
                    )}
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() =>
                          setExpandedRow(expandedRow === row.id ? null : row.id)
                        }
                      >
                        {expandedRow === row.id ? (
                          <VayuDownArrowIcon />
                        ) : (
                          <VayuUpArrowIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  {expandedRow === row.id && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 2} sx={{ p: 0 }}>
                        <Collapse in={true} timeout="auto" unmountOnExit>
                          <Box sx={{ p: 2, bgcolor: "#f0f4f8" }}>
                            <Typography variant="body2">
                              <b>Details:</b>
                              <br />
                              <b>{row.name || `Row ${row.id}`}</b>
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Paper
          elevation={2}
          sx={{
            mt: 1,
            px: 1,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 0,
            border: "1px solid #000000FF"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Rows per page:
            </Typography>
            <FormControl size="small">
              <Select
                sx={{
                  borderRadius: 0
                }}
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {[10, 20, 50, 100].map((val) => (
                  <MenuItem
                    sx={{
                      borderRadius: 0,
                      "&.MuiMenuItem-root": {
                        borderRadius: 0 // Additional safeguard for the inner MenuItem class
                      }
                    }}
                    key={val}
                    value={val}
                  >
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Pagination
            count={Math.ceil(rows.length / pageSize)}
            page={currentPage + 1}
            onChange={(e, page) => setCurrentPage(page - 1)}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            siblingCount={0}
            boundaryCount={1}
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: 0 // <--- 0 border radius for each item
              }
            }}
          />
        </Paper>
      </Box>
      

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            width: "300px",
            padding: "10px"
          }
        }}
      >
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel sx={{ fontWeight: 600 }}>Filter Type</InputLabel>
            <Select
              value={filterType}
              onChange={handleFilterTypeChange}
              label="Filter Type"
              sx={{
                borderRadius: 0,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black"
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1773be"
                }
              }}
            >
              <MenuItem value="contains">Contains</MenuItem>
              <MenuItem value="startsWith">Starts With</MenuItem>
              <MenuItem value="endsWith">Ends With</MenuItem>
              <MenuItem value="equals">Equals</MenuItem>
              <MenuItem value="greaterThan">Greater Than</MenuItem>
              <MenuItem value="lessThan">Less Than</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>

        <MenuItem>
          <TextField
            label="Filter Value"
            variant="outlined"
            value={filterValue}
            onChange={() => {
              handleFilterChange(filterType, filterValue);
            }}
            fullWidth
            sx={{
              mt: 1,
              "& .MuiInputLabel-root": {
                fontWeight: 600
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc"
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1773be"
              }
            }}
          />
        </MenuItem>

        <Box display="flex" justifyContent="flex-end" mt={2} mr={2}>
          <Button
            variant="contained"
            onClick={applyFilter}
            sx={{
              padding: "4px 16px",
              borderRadius: "0px",
              backgroundColor: "#1773ba",
              color: "white",
              "&:hover": {
                backgroundColor: "#1773ba"
              }
            }}
          >
            Apply
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default CustomTable;
