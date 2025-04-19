import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Switch,
  Tooltip,
  useTheme
} from '@mui/material';
import CommonTable from '../../../../components/Table/CommonTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserList,
  getUserList,
  setUserStatus
} from '../../../../api/AccessManagement';
import { clearPaginationHistory, updateLocalStorage } from 'src/utils/helper';
import { StyledTableCell } from '../../../../components/StyledComponents/Table';
import { DeleteIcon, EditIcon, EyeIcon } from 'src/assets/svg/svg';
import { CustomSwitch } from '../../../../components/CustomSwitch';
import NotFoundData from '../../../../components/NotFound';
import CustomBackdrop from 'src/components/CustomBackdrop/CustomBackdrop';
import { CustomPopUpModal } from 'src/models/customModal';
import { Delete, Visibility } from '@mui/icons-material';
import { useToasts } from 'react-toast-notifications';
import Header from './Header';
import { findRoles, hasPermission } from 'src/utils/permission';

const columns = [
  {
    id: 'checkbox',
    label: '',
    align: 'left',
    width: 100
  },
  {
    id: 'name',
    label: 'User Name',
    align: 'left',
    width: 200
  },
  {
    id: 'roleName',
    label: 'Role',
    align: 'left',
    width: 120
  },
  {
    id: 'userName',
    label: 'Email',
    align: 'left',
    width: 150
  },
  {
    id: 'lastAccess',
    label: 'Last Access',
    align: 'left',
    width: 220
  },
  {
    id: 'accessManagement',
    label: 'Action',
    align: 'center',
    width: 300
  }
];

const UserManagement = () => {
  const theme = useTheme();
  const defaultPayload = {
    PageNumber: 1,
    PageSize: 30,
    Role: null,
    NameOrEmail: null
  };
  const { permission } = useSelector((state: any) => state.accessManagement);

  const { moduleListByRole } = useSelector((state: any) => state.auth);
  const { userList } = useSelector((state: any) => state.accessManagement);
  const [filterData, setFilterData] = useState(defaultPayload);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectRow, setSelectRow] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [activeView, setActiveView] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState(null);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const fetchList = (payload) => {
    setLoading(true);
    dispatch(getUserList(payload))
      .then((res) => {
        setLoading(false);
        updateLocalStorage(currentPage);
        // setFiltersData(payload);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchList(filterData);
    // dispatch(getUserList(filterData));
  }, []);

  useEffect(() => {
    if (selectedEmails.length > 0) {
      setIsBulk(true);
      return;
    }
    setIsBulk(false);
  }, [selectedEmails]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
    setFilterData({
      ...filterData,
      PageSize: parseInt(event.target.value)
    });
    fetchList({ ...filterData, PageSize: parseInt(event.target.value) });
    clearPaginationHistory();
  };

  const nextPageHandler = () => {
    if (userList?.PageNumber !== null) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchList({ ...filterData, PageNumber: nextPage });
    }
  };

  const previousPageHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setCurrentPage(prevPage);
      fetchList({ ...filterData, PageNumber: prevPage });
    }
  };

  const handleStatusChange = (row, newStatus) => {
    setLoading(true);
    dispatch(setUserStatus({ userName: row.userName, isActivate: newStatus }))
      .then((res) => {
        setLoading(false);
        // fetchList(filterData);
      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
    // updateStatusInBackend(rowId, newStatus);
  };

  // const filterByRole = (type) => {
  //   // let rolesToHide = findRoles(moduleListByRole.roleName);

  //   // if (rolesToHide.includes(row.roleName)) {
  //   //   return true;
  //   // }
  //   // if (moduleListByRole.roleName === 'user' || rolesToHide.length === 0) {
  //   //   return true;
  //   // }

  //   const hasRoleManagementPermission =
  //     type === 'view'
  //       ? hasPermission(moduleListByRole, permission?.User_Management_View)
  //       : type === 'edit'
  //       ? hasPermission(
  //           moduleListByRole,
  //           permission?.User_Management_Edit_User_Details
  //         )
  //       : type === 'delete'
  //       ? hasPermission(
  //           moduleListByRole,
  //           permission?.User_Management_Delete_User
  //         )
  //       : hasPermission(
  //           moduleListByRole,
  //           permission?.User_Management_Bulk_Delete
  //         );

  //   return hasRoleManagementPermission ? false : true;
  // };

  // const filterByRole = (type) => {
  //   const permissionMap = {
  //     view: permission?.User_Management_View,
  //     edit: permission?.User_Management_Edit_User_Details,
  //     delete: permission?.User_Management_Delete_User,
  //     bulk: permission?.User_Management_Bulk_Delete
  //   };

  //   const requiredPermission = permissionMap[type];

  //   return requiredPermission ? !hasPermission(moduleListByRole, requiredPermission) : true;
  // };

  const filterByRole = (type, row) => {
    const permissionMap = {
      view: permission?.User_Management_View,
      edit: permission?.User_Management_Edit_User_Details,
      delete: permission?.User_Management_Delete_User,
      bulk: permission?.User_Management_Bulk_Delete
    };

    const requiredPermission = permissionMap[type];
    let rolesToHide = findRoles(moduleListByRole.roleName);

    const hasRequiredPermission = requiredPermission
      ? !hasPermission(moduleListByRole, requiredPermission)
      : false;

    const isRoleHidden = rolesToHide.includes(row.roleName);

    return hasRequiredPermission || isRoleHidden;

    // return requiredPermission
    //   ? !hasPermission(moduleListByRole, requiredPermission)
    //   : true;
  };

  // Edit action Start
  const ActionContent = ({ column, row, onStatusChange }) => {
    const [isActive, setIsActive] = useState(row.isActive);

    const handleChange = () => {
      const newStatus = !isActive;
      setIsActive(newStatus);
      onStatusChange(row, newStatus); // Assuming each row has an id
    };

    const deleteHandler = (item) => {
      setShow(true);
      setSelectRow(item.email);
    };

    return (
      <StyledTableCell
        key={column.id}
        align={column.align}
        style={{
          width: column.width,
          minWidth: column.width,
          // color: getRowColor(row),
          textAlign: 'center'
        }}
      >
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Box>
            <Tooltip title="View" placement="top">
              <IconButton
                sx={{
                  cursor: filterByRole('view', row)
                    ? 'not-allowed !important'
                    : 'pointer !important'
                }}
              >
                <Button
                  disabled={filterByRole('view', row)}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setActiveEdit(false);
                    setActiveView(true);
                    setSelectedEditData(row);
                  }}
                  sx={{
                    borderRadius: 0,
                    width: 38,
                    height: 35,
                    border: `1px solid ${theme.colors.alpha.black[100]}`,
                    backgroundColor: theme.colors.alpha.trueWhite[100],
                    padding: '11px 10px !important',
                    minWidth: 'unset',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Visibility />
                </Button>
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit" placement="top">
              <IconButton
                sx={{
                  cursor: filterByRole('edit', row)
                    ? 'not-allowed !important'
                    : 'pointer !important'
                }}
              >
                <Button
                  disabled={filterByRole('edit', row)}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setActiveEdit(true);
                    setActiveView(false);
                    setSelectedEditData(row);
                  }}
                  sx={{
                    borderRadius: 0,
                    width: 38,
                    height: 35,
                    border: `1px solid ${theme.colors.alpha.black[100]}`,
                    backgroundColor: theme.colors.alpha.trueWhite[100],
                    padding: '11px 10px !important',
                    minWidth: 'unset',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <EditIcon />
                </Button>
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <Tooltip title="Is Active" placement="top">
              <CustomSwitch
                disabled={filterByRole('edit', row)}
                onChange={handleChange}
                checked={row.isActive} // Pass checked prop here
              />
            </Tooltip>
          </Box>

          <Box>
            <Tooltip title="Delete" placement="top">
              <IconButton
                sx={{
                  cursor: filterByRole('delete', row)
                    ? 'not-allowed !important'
                    : 'pointer !important'
                }}
              >
                <Button
                  disabled={filterByRole('delete', row)}
                  variant="contained"
                  color="primary"
                  onClick={() => deleteHandler(row)}
                  sx={{
                    borderRadius: 0,
                    width: 38,
                    height: 35,
                    border: `1px solid ${theme.colors.alpha.black[100]}`,
                    backgroundColor: theme.colors.alpha.trueWhite[100],
                    padding: '11px 10px !important',
                    minWidth: 'unset',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Delete />
                </Button>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </StyledTableCell>
    );
  };
  // edit action end

  const toggleDrawer = () => {
    setShow(!show);
  };

  const handleApply = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        deleteUserList({
          userEmailList:
            selectedEmails.length >= 1 ? selectedEmails : [selectRow]
        })
      );
      if (res) {
        setLoading(false);
        setSelectRow('');
        setSelectedEmails([]);
        setShow(false);
        setIsBulk(false);
        addToast(res.message, {
          appearance: 'success'
        });
        fetchList(filterData);
      }
    } catch (error) {
      setLoading(false);
      setShow(false);
      setIsBulk(false);
      setSelectRow('');
      setSelectedEmails([]);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFilterData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'Role') {
      fetchList({ ...filterData, Role: value });
    }
  };
  const applyFilterHandler = () => {
    fetchList({ ...filterData });
  };
  const clearFilterHandler = () => {
    setFilterData(defaultPayload);
    fetchList({ ...defaultPayload });
  };
  const handleCheckboxChange = (email) => {
    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(email)
        ? prevSelectedEmails.filter((e) => e !== email)
        : [...prevSelectedEmails, email]
    );
  };

  const ActionCheckBoxes = ({ column, row }) => {
    const isChecked = selectedEmails?.includes(row.email);

    // const filterByRole = (row) => {
    //   let rolesToHide = findRoles(moduleListByRole.roleName);

    //   if (rolesToHide.includes(row.roleName)) {
    //     return true;
    //   }
    //   if (moduleListByRole.roleName === 'user' || rolesToHide.length === 0) {
    //     return true;
    //   }
    //   return false;
    // };
    return (
      <StyledTableCell
        key={column.id}
        align={column.align}
        style={{
          width: column.width,
          minWidth: column.width,
          // color: getRowColor(row),
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            cursor: filterByRole('bulk', row)
              ? 'not-allowed !important'
              : 'pointer !important'
          }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Checkbox
            disabled={filterByRole('bulk', row)}
            checked={isChecked}
            onChange={() => handleCheckboxChange(row.email)}
          />
        </Box>
      </StyledTableCell>
    );
  };

  const applyBulkHandler = () => {
    setShow(true);
  };

  const clearBulkHandler = () => {
    setSelectedEmails([]);
  };

  return (
    <>
      {loading && <CustomBackdrop open={loading} />}
      <CustomPopUpModal
        open={show}
        setOpen={toggleDrawer}
        handleClose={toggleDrawer}
        title="Delete"
        buttonText="Ok"
        isApply
        handleApply={handleApply}
        children={'Are you sure want to delete?'}
      />
      <Box>
        <Box mt={2}>
          <Header
            fetchList={() => fetchList(defaultPayload)}
            isBulk={isBulk}
            filterData={filterData}
            onChangeHandler={onChangeHandler}
            applyFilterHandler={applyFilterHandler}
            clearFilterHandler={clearFilterHandler}
            applyBulkHandler={applyBulkHandler}
            activeViewState={activeView}
            setActiveViewState={setActiveView}
            activeEdit={activeEdit}
            selectedEditData={selectedEditData}
            setActiveEdit={setActiveEdit}
            setSelectedEditData={setSelectedEditData}
            clearBulkHandler={clearBulkHandler}
          />
        </Box>
        <Box mt={2}>
          <CommonTable
            columns={columns}
            currentPage={currentPage}
            rows={userList?.userList || []}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            nextPageHandler={nextPageHandler}
            previousPageHandler={previousPageHandler}
            totalRecords={userList?.totalRecords}
            checkBoxes={(column, row) => (
              <ActionCheckBoxes column={column} row={row} />
            )}
            loading={loading}
            action={(column, row) => (
              <ActionContent
                column={column}
                row={row}
                onStatusChange={handleStatusChange}
              />
            )}
          />
          {/* {!(userList?.userList?.length > 0) && !loading && <NotFoundData />} */}
        </Box>
      </Box>
    </>
  );
};

export default UserManagement;
