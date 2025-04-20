import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Hidden,
  InputLabel,
  lighten,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Select,
  Typography,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp';
import {
  ClientIcon,
  // HESCommandsIcon,
  PeopleIcon,
  SettingIcon
} from 'src/assets/svg/svg';
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage
} from 'src/utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAction } from 'src/api/auth';
import { useTheme } from '@mui/material/styles';
import { Settings } from '@mui/icons-material';
import { setPageTitle } from 'src/reducers/common';
import { hasPermission } from 'src/utils/permission';
import { showToast } from 'src/customHooks/ToastEmitter';
import CustomBackdrop from 'src/components/CustomBackdrop/CustomBackdrop';
import {
  ProjectMenuItem,
  ProjectSelect,
  ProjectSelectDropDown,
  ProjectSelectIcon
} from 'src/components/CustomSelectMenu';
const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.alpha.black[100]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
           color: ${theme.colors.alpha.black[100]};
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
       color: ${theme.colors.alpha.black[100]};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
 color: ${theme.colors.alpha.black[80]};
`
);

function HeaderUserbox() {
  const theme = useTheme();
  const { permission } = useSelector((state: any) => state.accessManagement);
  const { moduleListByRole } = useSelector((state: any) => state.auth);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  let projectList = getLocalStorage('projectList');
  const [selectedProject, setSelectedProject] = useState(() => {
    return getLocalStorage('project') || '""';
  });

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const signOutHandler = async () => {
    setLoading(true);
    let res = await dispatch(
      logOutAction({ userName: getLocalStorage('userName') })
    );
    if (res?.success) {
      setLoading(true);
      clearLocalStorage();
      navigate('/login');
    } else {
      setLoading(false);
      showToast('Something went wrong', { appearance: 'error' });
    }
  };

  const settingsHandler = async () => {
    dispatch(setPageTitle('Settings'));
    setLocalStorage('title', 'Settings');
    navigate('/settings');
    setOpen(false);
  };

  const managementHandler = () => {
    dispatch(setPageTitle('Access Management'));
    setLocalStorage('title', 'Access Management');
    navigate('/access-management');
    setOpen(false);
  };

  const handleProjectChange = (event) => {
    const value = event.target.value;
    setSelectedProject(value);
    setLocalStorage('project', value);
    window.location.reload();
  };
  return (
    <>
      {loading && <CustomBackdrop open={loading} />}
      <Box sx={{ marginTop: '5px' }} ref={ref} onClick={handleOpen}>
        <PeopleIcon />
      </Box>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: {
            borderRadius: '0px', // remove border radius here
            boxShadow:
              '0px 0px 5px rgba(159, 162, 191, .18),0px 2px 2px rgba(159, 162, 191, 0.32)'
          }
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <PeopleIcon />
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {/* {getLocalStorage('userName')} */}
              Ayush
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {/* {moduleListByRole?.roleName?.toUpperCase()} */}
              Super Admin
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        {/* <Divider sx={{ mb: 0 }} /> */}

        <Box
          sx={{
            m: 1
          }}
        >
          {isMobile &&
            hasPermission(
              moduleListByRole,
              permission?.Meters_Filters_Project_SAT_Advanced
            ) && (
              <Button
                color="primary"
                sx={{
                  color: `${theme.colors.alpha.black[100]}`,
                  background: `${theme.colors.alpha.trueWhite[100]}`,
                  '& .MuiButton-label': {
                    justifyContent: 'space-between',
                    width: '100%'
                    // padding: '8px 12px' // Add vertical padding to the button
                  }
                }}
                fullWidth
              >
                <ClientIcon />
                <ProjectSelectDropDown
                  fullWidth
                  value={selectedProject}
                  onChange={handleProjectChange}
                  defaultValue={getLocalStorage('project') || 'null'}
                  displayEmpty
                  sx={{
                    border: '0px solid'
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        padding: '0',
                        borderRadius: '0px',
                        boxShadow: 'none'
                      }
                    },
                    MenuListProps: {
                      style: {
                        padding: '0px',
                        maxHeight: 400,
                        overflowY: 'auto'
                      }
                    }
                  }}
                  renderValue={(selected) =>
                    !selected ? (
                      <Typography
                        color="text.secondary"
                        sx={{
                          width: '100%',
                          textAlign: 'left',
                          paddingLeft: '12px'
                        }}
                      >
                        Select a Project
                      </Typography>
                    ) : (
                      selected
                    )
                  }
                >
                  {projectList?.split(',')?.map((project) => (
                    <ProjectMenuItem key={project} value={project}>
                      {project}
                    </ProjectMenuItem>
                  ))}
                </ProjectSelectDropDown>
              </Button>
            )}

          {/* {(moduleListByRole?.roleName !== 'user' && */}
          {hasPermission(
            moduleListByRole,
            permission?.User_Role_Management
          ) && (
            <Button
              color="primary"
              onClick={() => managementHandler()}
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                color: `${theme.colors.alpha.black[100]}`,
                background: `${theme.colors.alpha.trueWhite[100]}`
              }}
              fullWidth
            >
              {/* <HESCommandsIcon /> */}
              <ArticleSharpIcon />
              <Box marginLeft={1}> Management </Box>
            </Button>
          )}

          <Button
            color="primary"
            onClick={() => settingsHandler()}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              color: `${theme.colors.alpha.black[100]}`,
              background: `${theme.colors.alpha.trueWhite[100]}`
            }}
            fullWidth
          >
            <Settings />
            <Box marginLeft={1}> Settings </Box>
          </Button>
        </Box>
        <Divider sx={{ mb: 0 }} />
        <Box
          sx={{
            m: 1
          }}
        >
          <Button
            color="primary"
            onClick={() => signOutHandler()}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              color: `${theme.colors.alpha.black[100]}`,
              background: `${theme.colors.alpha.primary[100]}`
            }}
            fullWidth
          >
            <LockOpenTwoToneIcon />
            <Box marginLeft={1}> Log out </Box>
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
