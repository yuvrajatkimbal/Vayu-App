import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  Grid,
  InputLabel,
  FormControl,
  Typography,
  FormHelperText,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Button,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import {
  ClearIcon,
  DeleteIcon,
  MeterNoApplyIcon,
  TickIcon
} from 'src/assets/svg/svg';
import { useTheme } from '@mui/material';
import CommonButton from 'src/components/Button';
import CommonDropdown from 'src/components/CustomDropdown/CustomDropdown';
import CustomBackdrop from 'src/components/CustomBackdrop/CustomBackdrop';
import CustomDrawer from 'src/components/CustomDrawer';
import CommonSelectBox from 'src/components/SelectBox/SelectBox';
import {
  Clear,
  Delete,
  Description,
  Source,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getModules,
  getRoleModuleMapping,
  getRoles,
  register,
  updateRoleModuleMapping,
  updateUserDetail
} from 'src/api/AccessManagement';
import { useToasts } from 'react-toast-notifications';
import { Checkbox, List, ListItem } from '@mui/material';
import { findRoles, hasPermission } from 'src/utils/permission';
import { getMeterProjectList } from 'src/api/common';
// import { getMeterDropdownDetailHandler } from 'src/api/Meters';
import { encryptMessage, getLocalStorage } from 'src/utils/helper';
import { roleNames } from 'src/utils/const';
// Define the props type for the Header component
interface HeaderProps {
  fetchList: () => void;
  filterData: any;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  applyFilterHandler: () => void;
  clearBulkHandler?: () => void;
  clearFilterHandler: () => void;
  isBulk?: boolean;
  isRole?: boolean;
  applyBulkHandler?: () => void;
  activeViewState?: boolean;
  setActiveViewState?: any;
  activeEdit?: boolean;
  selectedEditData?: any;
  setActiveEdit?: any;
  setSelectedEditData?: any;
}

// for role Management

const RoleContent = ({
  roleModule,
  setRoleModule,
  moduleList,
  handleCheckboxChange,
  handleRoleApply,
  refRoleHandler,
  activeView,
  moduleListByRole,
  activeEdit
}) => {
  const theme = useTheme();

  const filterCheck = (roleModule) => {
    if (moduleListByRole?.roleName === 'superadmin') {
      let rolesToHide = findRoles('user');
      const isRoleHidden = rolesToHide.includes(roleModule.roleName);
      return isRoleHidden;
    }
  };


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2
        }}
      >
        <FormControl fullWidth>
          <TextField
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={roleModule.roleName}
            onChange={(e) => {
              setRoleModule({ ...roleModule, roleName: e.target.value });
            }}
            required
            disabled={activeView ? activeView : activeEdit ? true : false}
            fullWidth
            variant="outlined"
            // color={errorsMsg.name ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="desc"
            type="textarea"
            name="description"
            placeholder="Description"
            value={roleModule.description}
            onChange={(e) => {
              setRoleModule({ ...roleModule, description: e.target.value });
            }}
            required
            // disabled={activeView ? activeView : filterCheck(roleModule)}
            disabled={activeView ? activeView : activeEdit ? true : false}
            fullWidth
            variant="outlined"
            multiline
            rows={3}
          />
        </FormControl>
        <FormControl fullWidth>
          <List sx={{ p: 0 }}>
            {moduleList?.map((row, i) => (
              <ListItem key={row.moduleName}>
                <Checkbox
                  disabled={activeView ? activeView : false}
                  onClick={(e) => e.stopPropagation()}
                  checked={roleModule?.moduleList?.includes(row.moduleName)}
                  onChange={() => handleCheckboxChange(row.moduleName)}
                />
                {row.moduleName}
              </ListItem>
            ))}
          </List>

          <Button
            sx={{ display: 'none' }}
            onClick={handleRoleApply}
            ref={refRoleHandler}
          >
            Apply button
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

// for user Management

const Content = ({
  formState,
  setFormState,
  errors,
  setErrors,
  errorsMsg,
  setErrorsMsg,
  showPassword,
  setShowPassword,
  roles,
  handleApplys,
  refHandler,
  activeViewState,
  activeEdit,
  moduleListByRole,
  projectList,
  columnsList,
  setColumnsList,
  getMeterDropdownDetailList
}) => {
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roleName') {
      const selectedRole = roles?.roleList?.find(
        (item) => item.roleId === value
      );

      setFormState((prevState) => ({
        ...prevState,
        roleName: selectedRole?.roleName,
        roleId: value
      }));
    } else if (name === 'project') {
      setColumnsList(typeof value === 'string' ? value.split(',') : value);
      setFormState((prevState) => ({
        ...prevState,
        project: value.join(',')
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false
    }));

    setErrorsMsg((prevErrorsMsg) => ({
      ...prevErrorsMsg,
      [name]: ''
    }));
  };

  const filterRoles = (loggedInRole) => {
    let rolesToHide = findRoles(loggedInRole);
    let list = roles?.roleList?.filter(
      (role) => !rolesToHide.includes(role.roleName.toLowerCase())
    );
    list = list?.map((item, i) => {
      let obj = {
        value: item?.roleId,
        label: item?.roleName
      };
      return obj;
    });
    return list;
  };

  return (
    <>
      <form
        style={{
          padding: '20px 0px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2
          }}
        >
          {/* name Field */}
          <FormControl fullWidth>
            <TextField
              error={errors.name}
              helperText={errorsMsg.name}
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              inputProps={{
                style: {
                  fontSize: '20px'
                }
              }}
              value={formState.name}
              disabled={activeViewState ? true : false}
              onChange={(e) => {
                handleChange(e);
                //   setEmailError(false);
                //   setEmailErrorMessage('');
              }}
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={errorsMsg.name ? 'error' : 'primary'}
            />
          </FormControl>
          {/* Email Field */}
          <FormControl fullWidth>
            <TextField
              error={errors.email}
              helperText={errorsMsg.email}
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              inputProps={{
                style: {
                  fontSize: '20px'
                }
              }}
              disabled={activeViewState || activeEdit ? true : false}
              value={formState.email}
              onChange={(e) => {
                handleChange(e);
                //   setEmailError(false);
                //   setEmailErrorMessage('');
              }}
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={errorsMsg.email ? 'error' : 'primary'}
            />
          </FormControl>
          {/* Password Field */}
          {!activeEdit && !activeViewState && (
            <FormControl variant="outlined" error={errors.password}>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                sx={{ borderRadius: 0 }}
                placeholder="Password"
                disabled={activeViewState ? true : false}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  handleChange(e);
                  // setPasswordError(false);
                  // setPasswordErrorMessage('');
                }}
                inputProps={{
                  style: {
                    fontSize: '20px'
                  }
                }}
                required
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disabled={activeViewState ? true : false}
                      // className="custom-textfield"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText>{errorsMsg.password}</FormHelperText>
              )}
            </FormControl>
          )}
          {/* Number field */}
          <FormControl fullWidth>
            <TextField
              error={errors.phoneNumber}
              helperText={errorsMsg.phoneNumber}
              id=""
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formState.phoneNumber}
              disabled={activeViewState ? true : false}
              onChange={(e) => {
                handleChange(e);
                //   setEmailError(false);
                //   setEmailErrorMessage('');
              }}
              inputProps={{
                style: {
                  fontSize: '20px'
                }
              }}
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={errorsMsg.phoneNumber ? 'error' : 'primary'}
            />
          </FormControl>
          {/* project field */}
          <CommonSelectBox
            error={errors.roleName}
            errorMsg={errorsMsg.roleName}
            // id="roleName"
            name="roleName"
            value={formState.roleId}
            onChange={handleChange}
            disabled={activeViewState ? true : false}
            fullWidth
            renderValue={(selectedValue) => {
              if (!selectedValue) {
                return (
                  <Typography fontSize={18} color="gray">
                    Role
                  </Typography>
                );
              }
              const selectedOption = filterRoles(
                moduleListByRole?.roleName
              ).find((option) => option.value === selectedValue);
              return selectedOption ? (
                <Typography fontSize={18}>{selectedOption.label}</Typography>
              ) : (
                <Typography fontSize={18} color="gray">
                  Role
                </Typography>
              );
            }}
            options={filterRoles(moduleListByRole?.roleName)}
          />
          {/* Project field */}

          <CommonSelectBox
            error={errors.project}
            errorMsg={errorsMsg.project}
            name="project"
            multiple={true}
            value={columnsList}
            // onChange={handleChangeMultipleSelect}
            onChange={handleChange}
            disabled={activeViewState}
            fullWidth
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography color="text.secondary" fontSize={18}>
                    Project
                  </Typography>
                );
              }
              return selected.join(', ');
            }}
            options={projectList?.map((item, i) => {
              let obj = {
                value: item.projectName,
                label: item.projectName
              };
              return obj;
            })}
          />
          {/* source field */}

          <CommonSelectBox
            error={errors.source}
            errorMsg={errorsMsg.source}
            name="source"
            value={formState.source}
            onChange={(event) => {
              handleChange(event);
              // Make sure to update formState.source here if needed
            }}
            disabled={activeViewState}
            fullWidth
            renderValue={(selectedValue) => {
              if (!selectedValue) {
                return (
                  <Typography fontSize={18} color="gray">
                    Role Purpose
                  </Typography>
                );
              }
              const selectedOption =
                getMeterDropdownDetailList?.dropdownDetailList?.[0]?.optionsList?.find(
                  (option) => option.options === selectedValue
                );
              return selectedOption ? (
                <Typography fontSize={18}>{selectedOption.options}</Typography>
              ) : (
                <Typography fontSize={18} color="gray">
                  Role Purpose
                </Typography>
              );
            }}
            options={getMeterDropdownDetailList?.dropdownDetailList?.[0]?.optionsList?.map(
              (item) => ({
                value: item.options,
                label: item.options
              })
            )}
          />
          <Button
            sx={{ display: 'none' }}
            onClick={handleApplys}
            ref={refHandler}
          >
            Apply button
          </Button>
        </Box>
      </form>
    </>
  );
};

// main component header

const Header: React.FC<HeaderProps> = ({
  fetchList,
  filterData,
  onChangeHandler,
  applyFilterHandler,
  clearFilterHandler,
  isRole,
  isBulk,
  applyBulkHandler,
  activeEdit,
  selectedEditData,
  setActiveEdit,
  setSelectedEditData,
  activeViewState,
  setActiveViewState,
  clearBulkHandler
}) => {
  let secretKey = "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFt4U5sB+I3fi4GATqnJYbTuPo1hrzZR0y4zolF6UA2EWvZMRoslvZJP8wqV4iwPFhSBXNj+bEPolnL117DGWgXIroN0NV1vF51FcdbYZXP8MltY4XNnzelawsnzeKwHqtg3I0wj5DfxmYDTlCjgdKhdABdg91T1+WZeeR0mpyH9AgMBAAE="
  let defaultPayload = {
    roleName: '',
    roleId: null,
    description: '',
    moduleList: []
  };
  let defaultFormData = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    project: '',
    roleId: '',
    roleName: '',
    source: '',
    isActive: true
  };

  let defaultErrors = {
    name: false,
    email: false,
    password: false,
    phoneNumber: false,
    roleName: false,
    project: false,
    source: false
  };
  let defaultErrorMsg = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    roleName: '',
    project: '',
    source: ''
  };

  // Validation rules
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // const phoneRegex = /^\d{10}$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const theme = useTheme();
  const { addToast } = useToasts();
  const refHandler = useRef(null);
  const refRoleHandler = useRef(null);
  const { roles, moduleList } = useSelector(
    (state: any) => state.accessManagement
  );
  const { permission } = useSelector((state: any) => state.accessManagement);
  const { getMeterDropdownDetailList } = useSelector(
    (state: any) => state.meters
  );
  const media = useMediaQuery(theme.breakpoints.up('lg'));
  const { projectList } = useSelector((state: any) => state.common);
  const { moduleListByRole } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [columnsList, setColumnsList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [roleModule, setRoleModule] = useState(defaultPayload);
  const [roleListMapping, setRoleListMapping] = useState([]);
  const [formState, setFormState] = useState(defaultFormData);
  const [errors, setErrors] = useState(defaultErrors);
  const [errorsMsg, setErrorsMsg] = useState(defaultErrorMsg);

  const [showPassword, setShowPassword] = useState(false);



  const toggleDrawer = () => {
    setSelectedEditData(null);
    setRoleModule(defaultPayload);
    setFormState(defaultFormData);
    setActiveViewState(false);
    setActiveEdit(false);
    setDrawerOpen(!drawerOpen);
    setColumnsList([]);
    setErrors(defaultErrors);
    setErrorsMsg(defaultErrorMsg);
  };

  const getRoleListCall = () => {
    setLoading(true);
    dispatch(
      getRoleModuleMapping({
        RoleName: selectedEditData?.roleName,
        RoleId: selectedEditData?.roleId
      })
    )
      .then((res) => {
        let createPayload = {
          roleName: res.roleName,
          roleId: res.roleId,
          description: selectedEditData.description,
          // moduleList: findIds.map((item) => item.moduleId)
          moduleList: res?.moduleListByRole?.map((item) => item.moduleName)
        };
        setLoading(false);
        setRoleModule(createPayload);
        dispatch(getRoles());
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getUserDetail = () => {
    setLoading(true);
    if (selectedEditData) {
      setFormState({ ...selectedEditData });
      setColumnsList(selectedEditData.project.split(','));
      setLoading(false);
    }
  };

  const handleApply = () => {
    refHandler.current.click();
  };

  const handleRoleRefApply = () => {
    refRoleHandler.current.click();
  };

  const handleCheckboxChange = (item) => {
    if (roleModule?.moduleList?.includes(item)) {
      setRoleModule({
        ...roleModule,
        moduleList: roleModule?.moduleList?.filter((module) => module !== item)
      });
    } else {
      setRoleModule({
        ...roleModule,
        moduleList: [...roleModule?.moduleList, item]
      });
    }
  };

  const handleRoleApply = async () => {
    if (roleModule.roleName && roleModule.moduleList.length > 0) {
      let payload = {
        ...roleModule
        // moduleList: moduleList?.moduleList
        //   ?.filter((module) => roleModule.moduleList.includes(module.moduleId))
        //   .map((module) => module.moduleName)
      };

      setLoading(true);
      try {
        let res = await dispatch(updateRoleModuleMapping(payload));
        if (res) {
          console.log('res', res);
          setLoading(false);
          toggleDrawer();
          fetchList();
          addToast(res.Message, {
            appearance: 'success'
          });
        }
      } catch (error) {
        setLoading(false);
        toggleDrawer();
        // setFormState(defaultPaylod);
      }
    } else {
      addToast('Fields are required', {
        appearance: 'success'
      });
    }
  };

  //  user Management
  const validateForm = () => {
    const { name, email, password, phoneNumber, roleName, project, source } =
      formState;
    let valid = true;
    const newErrors = { ...errors };
    const newErrorsMsg = { ...errorsMsg };

    // Name validation
    if (!name.trim()) {
      newErrors.name = true;
      newErrorsMsg.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!emailRegex.test(email)) {
      newErrors.email = true;
      newErrorsMsg.email = 'Invalid email format';
      valid = false;
    }

    if (!activeEdit) {
      if (!password) {
        newErrors.password = true;
        newErrorsMsg.password = 'Password is required';
        valid = false;
      } else if (password.length < 8) {
        newErrors.password = true;
        newErrorsMsg.password = 'Password must be at least 8 characters long';
        valid = false;
      } else if (!passwordRegex.test(password)) {
        newErrors.password = true;
        newErrorsMsg.password =
          'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
        valid = false;
      } else {
        newErrors.password = false;
        newErrorsMsg.password = '';
      }
    }

    // Phone number validation
    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = true;
      newErrorsMsg.phoneNumber =
        'Invalid phone number. Phone number must start with 6, 7, 8, or 9 and be 10 digits long.';
      valid = false;
    }

    // Role name validation
    if (!roleName) {
      newErrors.roleName = true;
      newErrorsMsg.roleName = 'Role is required';
      valid = false;
    }

    // Project validation
    if (!project) {
      newErrors.project = true;
      newErrorsMsg.project = 'Project is required';
      valid = false;
    }
    // Project validation
    if (!source) {
      newErrors.source = true;
      newErrorsMsg.source = 'Source is required';
      valid = false;
    }

    setErrors(newErrors);
    setErrorsMsg(newErrorsMsg);
    return valid;
  };

  const handleApplys = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        let res = await dispatch(
          activeEdit
            ? updateUserDetail({
                name: formState.name,
                email: formState.email,
                phoneNumber: formState.phoneNumber,
                project: formState.project,
                roleId: formState.roleId,
                isActive: formState.isActive,
                roleName: formState.roleName
              })
            : register({
                ...formState,
                password: encryptMessage(formState?.password, secretKey)
              })
        );
        if (res) {
          setLoading(false);
          toggleDrawer();
          setFormState(defaultFormData);
          fetchList();
          addToast(res.message, {
            appearance: 'success'
          });
        }
      } catch (error) {
        setLoading(false);
        toggleDrawer();
        addToast(error?.data?.errors?.Message, {
          appearance: 'error'
        });
        setFormState(defaultFormData);
        // addToast(res.message, {
        //   appearance: 'success'
        // });
      }
    } else {
      console.log('Validation errors');
    }
  };

  useEffect(() => {
    if (!isRole) {
      dispatch(getMeterProjectList());
      // dispatch(
      //   getMeterDropdownDetailHandler({
      //     Project: getLocalStorage('project'),
      //     DropdownName: 'rolepurpose'
      //   })
      // );
      dispatch(getRoles());
    }
    if (moduleListByRole.roleName === 'superadmin') {
      // dispatch(getModules());
    }

    if (isRole && moduleListByRole.roleName !== 'superadmin') {
      dispatch(
        getRoleModuleMapping({
          RoleName: moduleListByRole?.roleName,
          RoleId: moduleListByRole?.roleId
        })
      )
        .then((res) => {
          setRoleListMapping(res?.moduleListByRole);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [isRole]);

  useEffect(() => {
    if (activeEdit || activeViewState) {
      setDrawerOpen(true);
      if (isRole) {
        getRoleListCall();
      } else {
        getUserDetail();
      }
    }
  }, [activeEdit, activeViewState]);

  return (
    <>
      {loading && <CustomBackdrop open={loading} />}
      <CustomDrawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        title={
          isRole
            ? activeEdit
              ? 'Edit Role'
              : activeViewState
              ? 'View Role'
              : 'Add Role'
            : activeEdit
            ? 'Edit User'
            : activeViewState
            ? 'View User'
            : 'Add User'
        }
        buttonText="Apply"
        isApply={activeViewState ? false : true}
        onApply={isRole ? handleRoleRefApply : handleApply}
        isDisabled={activeViewState}
        // isCancel
        // onCancel={handleCancel}
        children={
          isRole ? (
            <RoleContent
              roleModule={roleModule}
              setRoleModule={setRoleModule}
              moduleListByRole={moduleListByRole}
              moduleList={
                moduleListByRole.roleName === 'superadmin'
                  ? moduleList?.moduleList
                  : roleListMapping
              }
              handleCheckboxChange={handleCheckboxChange}
              handleRoleApply={handleRoleApply}
              refRoleHandler={refRoleHandler}
              activeView={activeViewState}
              activeEdit={activeEdit}
            />
          ) : (
            <Content
              formState={formState}
              errors={errors}
              errorsMsg={errorsMsg}
              showPassword={showPassword}
              setFormState={setFormState}
              setErrors={setErrors}
              setErrorsMsg={setErrorsMsg}
              setShowPassword={setShowPassword}
              roles={roles}
              handleApplys={handleApplys}
              refHandler={refHandler}
              activeViewState={activeViewState}
              activeEdit={activeEdit}
              moduleListByRole={moduleListByRole}
              projectList={projectList?.projectList}
              columnsList={columnsList}
              setColumnsList={setColumnsList}
              getMeterDropdownDetailList={getMeterDropdownDetailList}
            />
          )
        }
      />
      <Box>
        <Box
          sx={{
            display: media ? 'flex' : 'flex-column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {!isRole &&
            hasPermission(
              moduleListByRole,
              permission?.User_Management_Search
            ) && (
              <Box display={'flex'} alignItems={'center'}>
                <Box sx={{ width: media ? 'none' : '100%' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={filterData?.NameOrEmail || ''}
                    name="NameOrEmail"
                    placeholder="Search"
                    onChange={onChangeHandler}
                    InputProps={{
                      sx: {
                        width: media ? '100%' : '100%',
                        height: 35,
                        fontSize: '22px !important',
                        fontWeight: '500 !important',
                        borderRight: '0px'
                      }
                    }}
                  />
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'start'}
                  // pb={1}
                >
                  <Tooltip title="Apply Filters">
                    <IconButton onClick={applyFilterHandler}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: 0,
                          width: 44,
                          height: 35,
                          border: `1px solid ${theme.colors.alpha.black[100]}`,
                          backgroundColor: theme.colors.alpha.secondary[100],
                          padding: '11px 10px !important',
                          minWidth: 'unset',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <TickIcon />
                      </Button>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Clear Filters">
                    <IconButton onClick={clearFilterHandler}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: 0,
                          width: 44,
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
                        <ClearIcon />
                      </Button>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}
          <Box
            flexGrow={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: media ? 'end' : 'start',
              gap: 2
            }}
          >
            {isBulk && (
              <Box>
                <Tooltip title="Bulk Delete">
                  <IconButton onClick={applyBulkHandler}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 0,
                        width: 44,
                        height: 35,
                        border: `1px solid ${theme.colors.alpha.black[100]}`,
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
                <Tooltip title="Bulk Clear">
                  <IconButton onClick={clearBulkHandler}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 0,
                        width: 44,
                        height: 35,
                        border: `1px solid ${theme.colors.alpha.black[100]}`,
                        padding: '11px 10px !important',
                        minWidth: 'unset',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Clear />
                    </Button>
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {!isRole && (
              <CommonDropdown
                label={'Role'}
                name="Role"
                xs={12}
                sm={12}
                md={6}
                lg={4}
                value={filterData?.Role}
                onChange={onChangeHandler}
                options={roles?.roleList?.map((item, i) => {
                  let obj = {
                    value: item.roleName,
                    label: item.roleName
                  };
                  return obj;
                })}
                // xs={6}
                // sm={6}
                // md={6}
              />
            )}

            {((isRole &&
              hasPermission(
                moduleListByRole,
                permission?.Role_Management_Add_Role
              )) ||
              (!isRole &&
                hasPermission(
                  moduleListByRole,
                  permission?.User_Management_Add_User
                ))) && (
              <Box>
                <CommonButton
                  onClick={() => {
                    toggleDrawer();
                  }}
                  lg={2}
                  text={isRole ? 'Add Role' : 'Add User'}
                  disabled={false}
                  variant="contained"
                  loading={false}
                  color="primary"
                  size="small"
                  type="button"
                  sx={{ minWidth: '180px', paddingY: '8px' }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
