import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  styled,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import {
  StyledPagination,
  StyledTableCell,
  StyledTableRow
} from "../StyledComponents/Table";
import {
  DeleteIcon,
  EditIcon,
  NavigateBeforeDisableIcon,
  NavigateBeforeIcon,
  NavigateNextDisableIcon,
  NavigateNextIcon,
  NotFound,
  PencilIcon,
  RightTableIcon
} from "src/assets/svg/svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import TableHeaderCell from "./TableHeaderCell";
// import { useToasts } from "react-toast-notifications";
import { CustomSwitch } from "../CustomSwitch";
import { tabsEnum } from "src/utils/const";
import CommandStatusChip from "../CommandStatus";
import moment from "moment";
import getCellContent from "./GetCellContent";
import { setLocalStorage } from "src/utils/helper";
import CommonTableInterface from "./interface";

const CustomPreviousIcon = (props) => (
  <NavigateBeforeIcon {...props} style={{ fontSize: "20px" }} />
);

const CustomNextIcon = (props) => (
  <NavigateNextIcon {...props} style={{ fontSize: "20px" }} />
);

const CommonTable: React.FC<CommonTableInterface> = ({
  columns,
  rows,
  handleChangeRowsPerPage,
  rowsPerPage,
  totalRecords,
  paginationState,
  currentPaginationState,
  currentPage,
  pageNumber,
  nextPageHandler,
  routeType,
  previousPageHandler,
  isStatePagination,
  checkBoxes,
  action,
  loading,
  cellContent,
  handleGotoPageChange,
  handleKeyPress,
  filtersData,
  handleChangePage,
  totalPages,
  noPagination,
  isSelectionEnabled,
  selectedRows,
  handleRowSelection,
  handleSelectAll
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const { addToast } = useToasts();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState(columns[0]?.id);
  const [displayRows, setDisplayRows] = useState(rows); // State to hold rows to be displayed

  useEffect(() => {
    setDisplayRows(rows); // Update displayRows when rows prop changes
  }, [rows]);

  const handleRequestSort = (event, property) => {
    // const isAsc = orderBy === property && order === 'asc';
    // const newOrder = isAsc ? 'desc' : 'asc';
    // setOrder(newOrder);
    // setOrderBy(property);
    // const sortedRows = [...displayRows].sort((a, b) => {
    //   if (a[property] < b[property]) return newOrder === 'asc' ? -1 : 1;
    //   if (a[property] > b[property]) return newOrder === 'asc' ? 1 : -1;
    //   return 0;
    // });
    // setDisplayRows(sortedRows);
  };
  // const [checked, setChecked] = useState(false);

  // const handleChange = (event, item) => {
  //   let apiData = {
  //     meterCategory: item?.meterCategory,
  //     validationName: item?.validationName,
  //     profileType: item?.profileType,
  //     validationId: item?.validationId,
  //     validationExpression: item?.validationExpression,
  //     sequenceId: item?.sequenceId,
  //     isActive: item?.isActive === true ? false : true
  //   };
  //   let obj = {
  //     validationRules: [apiData]
  //   };
  //   dispatch(addUpdateVeeExpression(obj))
  //     .then((res) => {
  //       addToast(`Expression status updated successfully`, {
  //         appearance: 'success'
  //       });
  //       dispatch(
  //         getAllVEEExpressionList({
  //           MeterCategory: 'D1',
  //           ProfileType: 'INSTANTPROFILE',
  //           PageSize: 30,
  //           PaginationState: null,
  //           CurrentPaginationState: null,
  //           RequiredTotalCount: false
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       console.log('err', err);
  //     });
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const paginatedRows = displayRows?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getRowColor = (row) => {
    // if (row.isValid === false) return '#ff0000';
    // if (row.isActive === false) return theme.palette.text.disabled;
    // return 'inherit';
  };

  const handleNavigation = (row) => {
    if (location.pathname === `/nodes`) {
      navigate(`/node/${row?.nodeId}`);
    }
    if (location.pathname === `/gateways`) {
      navigate(`/gateway/${row?.id}`);
    }
  };

  const handleButtonClick = (data) => {
    let obj = {
      MeterCategory: data?.meterCategory,
      ProfileType: data?.profileType,
      RequiredTotalCount: false,
      PageSize: 1,
      ValidationId: data?.validationId
    };
    setLocalStorage("veeObject", obj);
    navigate("/edit-vee-expression");
  };

  const isTotalCount = (current, selectPage, total) => {
    let findTotal = current * selectPage;
    if (findTotal === total) {
      return true;
    }
  };

  return (
    <>
      <Paper
        sx={{
          borderRadius: "0px !important",
          boxShadow: "none",
          border: "1px solid #000"
        }}
      >
        <TableContainer
          sx={{
            "& .MuiTableHead-root": {
              position: "sticky",
              top: 0,
              zIndex: 2,
              backgroundColor: "#DBEEFF",
              borderBottom: "1px solid #ddd !important"
            },
            "& .MuiTableHead-root .MuiTableCell-root": {
              backgroundColor: "#DBEEFF"
            },
            "& table": {
              borderCollapse: "separate",
              borderSpacing: "0px"
            }
          }}
          className="custom-scrollbar"
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {isSelectionEnabled && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={{
                        color: selectedRows?.size > 0 ? "#1773BE" : "#000000",
                        "&.Mui-checked": { color: "#1773BE" }
                      }}
                      checked={
                        (selectedRows?.size || 0) === (rows?.length || 0) &&
                        rows?.length > 0
                      }
                      onChange={() => handleSelectAll(rows)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      top: 0,
                      minWidth: column.minWidth,
                      borderBottom: "1px solid grey",
                      textAlign: "center",
                      color: "black",
                      textTransform: "capitalize",
                      fontSize: "15px",
                      fontWeight: "500"
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>

          {/* Scrollable wrapper only around body */}
          <Box
            sx={{
              maxHeight: 525,
              overflowY: "auto"
            }}
            className="custom-scrollbar"
          >
            <Table aria-label="body table">
              <TableBody>
                {/* Your logic remains same here */}
                <StyledTableRow>
                  <StyledTableCell
                    sx={{ height: "0px !important" }}
                    colSpan={columns.length}
                    style={{
                      padding: "0px",
                      backgroundColor: "#fff",
                      border: "none"
                    }}
                  />
                </StyledTableRow>

                {loading ? (
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={columns.length}
                      align="center"
                      style={{
                        padding: "20px",
                        fontSize: "16px"
                      }}
                    >
                      <Box mt={4} mb={4}>
                        <CircularProgress />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : rows.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={columns.length} align="center">
                      <Box mt={4} mb={4}>
                        <NotFound />
                        <Typography className="f-20" mt={1}>
                          No Records Found
                        </Typography>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  paginatedRows?.map((row, rowIndex) => (
                    <StyledTableRow
                      key={rowIndex}
                      onClick={(event) => {
                        handleNavigation(row);
                      }}
                      sx={{
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f5f5f5", // subtle grey on hover
                          cursor: "pointer"
                        }
                      }}
                    >
                      {isSelectionEnabled && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            sx={{
                              color: selectedRows?.has(row.id)
                                ? "#1773BE"
                                : "#000000", // Default color
                              "&.Mui-checked": {
                                color: selectedRows?.has(row.id)
                                  ? "#1773BE"
                                  : "#000000" // Adjust checked color
                              }
                            }}
                            checked={!!selectedRows?.has(row.id)} // Ensure `selectedRows` is defined
                            onChange={() => handleRowSelection(row.id)} // Toggle selection using `id`
                          />
                        </TableCell>
                      )}
                      {columns.map((column) =>
                        getCellContent({
                          column,
                          row,
                          handleNavigation,
                          routeType,
                          checkBoxes,
                          action,
                          handleButtonClick,
                          cellContent
                        })
                      )}
                    </StyledTableRow>
                  ))
        
                )}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Paper>
      {rows?.length > 0 && (
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ my: 2 }}>
            <StyledPagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => handleChangePage(e, value)}
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>

          <Box>
            <Grid
              item
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: {
                  sm: "flex-end",
                  xs: "center"
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Typography className="f-16">Go to page</Typography>
                <Box mx={1}>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={pageNumber}
                    onChange={handleGotoPageChange}
                    onKeyDown={handleKeyPress}
                    sx={{
                      width: 60,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderRadius: "0px" // Adjust the border radius
                        }
                      },
                      "& input": {
                        textAlign: "center", // Center align the text
                        padding: "6px !important",
                        fontSize: "16px !important"
                      }
                    }}
                  />
                </Box>

                {totalPages && (
                  <Typography className="f-16">{`of ${totalPages}`}</Typography>
                )}
              </Box>
            </Grid>
          </Box>
        </Grid>
      )}

      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {rows.length > 0 && !noPagination && (
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1
          }}
        >
          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: {
                sm: 'flex-start',
                xs: 'center'
              }
            }}
          >
             
            <Box marginRight={1}>
              {isStatePagination ? (
                currentPaginationState == null ? (
                  <NavigateBeforeDisableIcon />
                ) : (
                  <Box onClick={previousPageHandler}>
                    <NavigateBeforeIcon />
                  </Box>
                )
              ) : currentPage <= 1 ? (
                <NavigateBeforeDisableIcon />
              ) : (
                <Box onClick={previousPageHandler}>
                  <NavigateBeforeIcon />
                </Box>
              )}
            </Box>
            <Box>
              {rows.length < rowsPerPage || isTotalCount(currentPage, rowsPerPage , totalRecords)  ? (
                <NavigateNextDisableIcon />
              ) : (
                <Box
                  onClick={
                    !(rows.length < rowsPerPage) ? nextPageHandler : null
                  }
                >
                  <NavigateNextIcon />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: {
                sm: 'flex-end',
                xs: 'center'
              }
            }}
          >
            <Box>
              <TablePagination
                rowsPerPageOptions={[10, 30, 50]}
                component="div"
                count={totalRecords ? totalRecords : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page:"
              />
            </Box>
          </Grid>
        </Grid>
      )}  */}
    </>
  );
};

export default CommonTable;
