import React, { useEffect, useState } from 'react';
import CustomBackdrop from 'src/components/CustomBackdrop/CustomBackdrop';
import { CustomPopUpModal } from 'src/models/customModal';
import Header from './Header';
import CommonTable from 'src/components/Table/CommonTable';
import { StyledTableCell } from 'src/components/StyledComponents/Table';
import { useToasts } from 'react-toast-notifications';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Switch,
  Tooltip,
  useTheme
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Visibility } from '@mui/icons-material';
import { CustomSwitch } from 'src/components/CustomSwitch';
import { EditIcon } from 'src/assets/svg/svg';
import { clearPaginationHistory } from 'src/utils/helper';
import { deleteRole, getRoles } from 'src/api/AccessManagement';
import { findRoles, hasPermission } from 'src/utils/permission';

const columns = [
  {
    id: 'roleName',
    label: 'Role',
    align: 'left',
    width: 120
  },

  {
    id: 'description',
    label: 'Descriptions',
    align: 'left',
    width: 400
  },
  {
    id: 'accessManagement',
    label: 'Action',
    align: 'center',
    width: 100
  }
];

const RoleManagement = () => {
  const { roles } = useSelector((state: any) => state.accessManagement);
  const { permission } = useSelector((state: any) => state.accessManagement);
  const { moduleListByRole } = useSelector((state: any) => state.auth);
  const theme = useTheme();
  const defaultPayload = {
    PageNumber: 1,
    PageSize: 30,
    Role: null,
    NameOrEmail: null
  };

  const [filterData, setFilterData] = useState(defaultPayload);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectRow, setSelectRow] = useState(null);
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
    dispatch(getRoles(payload))
      .then((res) => {
        setLoading(false);
        // updateLocalStorage(currentPage);
        // setFiltersData(payload);
      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchList(filterData);
    // dispatch(getUserList(filterData));
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFilterData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const toggleDrawer = () => {
    setShow(!show);
  };
  const handleApply = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        deleteRole({
          roleName: selectRow?.roleName,
          roleId: selectRow?.roleId
        })
      );
      if (res) {
        setLoading(false);
        setSelectRow(null);
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
      setSelectRow(null);
      setSelectedEmails([]);
    }
  };

  const applyFilterHandler = () => {
    fetchList({ ...filterData });
  };
  const clearFilterHandler = () => {
    setFilterData(defaultPayload);
    fetchList({ ...defaultPayload });
  };

  const nextPageHandler = () => {
    if (roles?.PageNumber !== null) {
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
    setFilterData({
      ...filterData,
      PageSize: parseInt(event.target.value)
    });
    clearPaginationHistory();
  };

  const filterByRole = (type, row) => {
    const permissionMap = {
      view: permission?.Role_Management_View,
      edit: permission?.Role_Management_Edit,
      delete: permission?.Role_Management_Delete_Role
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
  const ActionContent = ({ column, row }) => {
    const deleteHandler = (item) => {
      setShow(true);
      setSelectRow(item);
    };

    // const filterByRole = (row) => {
    //   let rolesToHide = findRoles(moduleListByRole.roleName);

    //   if (rolesToHide.includes(row.roleName)) {
    //     return true;
    //   }
    //   if (moduleListByRole.roleName === 'user' || rolesToHide.length === 0) {
    //     return true;
    //   }
    //    return false;
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
      {/* 
      <CustomDrawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        title={isRole ? 'Add Role' : 'Add User'}
        buttonText="Apply"
        isApply
        onApply={isRole ? handleRoleRefApply : handleApply}
        // isCancel
        // onCancel={handleCancel}
        children={
          isRole ? <RoleContent payload={defaultPayload} /> : <Content />
        }
      /> */}
      <Box>
        <Box mt={2}>
          <Header
            fetchList={() => fetchList(defaultPayload)}
            filterData={filterData}
            onChangeHandler={onChangeHandler}
            applyFilterHandler={applyFilterHandler}
            clearFilterHandler={clearFilterHandler}
            activeViewState={activeView}
            setActiveViewState={setActiveView}
            activeEdit={activeEdit}
            selectedEditData={selectedEditData}
            setActiveEdit={setActiveEdit}
            setSelectedEditData={setSelectedEditData}
            isRole
          />
        </Box>
        <Box mt={2}>
          <CommonTable
            columns={columns}
            currentPage={currentPage}
            rows={roles?.roleList || []}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            nextPageHandler={nextPageHandler}
            previousPageHandler={previousPageHandler}
            totalRecords={roles?.totalRecords}
            action={(column, row) => (
              <ActionContent column={column} row={row} />
            )}
            noPagination
            loading={loading}
          />
        </Box>
      </Box>
    </>
  );
};

export default RoleManagement;
