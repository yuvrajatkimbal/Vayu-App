import React, { useEffect, useRef, useState } from 'react';

import { FC, ReactNode } from 'react';
import { alpha, lighten, useMediaQuery } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
// import Footer from 'src/components/Footer';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Logo from 'src/components/LogoSign';
import { ChevronLeftIcon, ChevronRightIcon, LogoIcon } from 'src/assets/svg/svg';
import SidebarMenu from './Sidebar/SidebarMenu';
import Scrollbar from 'src/components/Scrollbar';
import { getModuleListByRoleAction, logOutAction } from 'src/api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getModules } from 'src/api/AccessManagement';
import { createPermissionEnum } from 'src/utils/permission';
import { setPermission } from 'src/reducers/AccessManagement';
import { clearLocalStorage, getLocalStorage } from 'src/utils/helper';
import CustomBackdrop from 'src/components/CustomBackdrop/CustomBackdrop';
import { getMeterProjectList } from 'src/api/common';

const drawerWidth = 290;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme }) => ({
  zIndex: 300,
  boxShadow: 'none',
  borderWidth: '0 0 1px 0', // Top, Right, Bottom, Left
  borderStyle: 'solid',
  borderColor: 'black', //
  background: theme.colors.alpha.white[100],
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      //@ts-ignore
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme }) => ({
  zIndex: 200,
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',

  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        '& .MuiPaper-root': {
          borderRight: `1px solid ${theme.colors.alpha.black[100]} `,
          overflowX: 'hidden'
        }
      }
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        '& .MuiPaper-root': {
          borderRight: `1px solid ${theme.colors.alpha.black[100]} `,
          overflowX: 'hidden'
        }
      }
    }
  ]
}));

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity timeout

  const theme = useTheme();
  const navigate = useNavigate();
  const { permission } = useSelector((state: any) => state.accessManagement);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [roleList, setRoleList] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLargeScreen) {
      setOpen(true);
    } else if (isLargeScreen && open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isLargeScreen]);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   dispatch(getModules())
  //     .then((res) => {
  //       let permissionList = createPermissionEnum(res?.moduleList);
  //       dispatch(setPermission(permissionList));
  //     })
  //     .catch((err) => {
  //     });
  // }, []);

  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Reference to track the timeout

  const logoutUser = () => {
    dispatch(logOutAction({ userName: getLocalStorage('userName') }))
      .then((res) => {
        clearLocalStorage();
        navigate('/login');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const resetIdleTimeout = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(logoutUser, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'touchstart'];

    events.forEach((event) => window.addEventListener(event, resetIdleTimeout));

    resetIdleTimeout();

    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimeout)
      );
    };
  }, []);

  // useEffect(() => {
  //   const fetchModuleList = async () => {
  //     try {
  //       await dispatch(getMeterProjectList());
  //       const res = await dispatch(getModuleListByRoleAction());

  //       if (res.roleId) {
  //         setRoleList(true);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching module list:', error);
  //       setRoleList(false);
  //       setLoading(false);
  //     }
  //   };
  //   setLoading(true);
  //   fetchModuleList();
  // }, []);

  return (
    <>
      {loading && <CustomBackdrop open={loading} />}
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          {/* @ts-ignore */}
          <AppBar open={open} position="fixed">
            <Box sx={{ display: 'flex',  height: '75px'}}>
              <Box
                className="cursor-pointer"
                sx={{
                  display: !open ? 'flex' : 'none',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '9px',
                  width: 72,
                  height: '75px'
                }}
              >
                <Logo open={!open} />
              </Box>
              <Divider
                sx={{ background: 'black', display: !open ? 'block' : 'none' }}
                orientation="vertical"
              />
              <Box sx={{ flexGrow: '1' }}>
                <Header />
              </Box>
            </Box>
          </AppBar>
          {/* Mobile Drawer */}
          {/* <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          <Box
            className="cursor-pointer"
            sx={{
              padding: theme.spacing(1.7, 0),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid black'
            }}
          >
            <Logo open={!open} />
          </Box>
          <Scrollbar>
            <SidebarMenu />
          </Scrollbar>
          <Divider sx={{ background: 'black' }} />
          <ListItem>
            <IconButton onClick={handleDrawerClose}>
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </ListItem>
        </Drawer> */}
        
          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            /* @ts-ignore */
            component="aside"
            open={open}
            sx={{
              display: { xs: 'block'},
              width: open ? drawerWidth : 73,
              '& .MuiDrawer-paper': {
                width: open ? drawerWidth : 73
              }
            }}
          >
            <Box
              className="cursor-pointer"
              sx={{
                padding: theme.spacing(1.7, 0),
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                paddingLeft: '25px',
                borderBottom: '1px solid black'
              }}
            >
              <Logo open={!open} />
            </Box> 
            <Scrollbar>
              <SidebarMenu />
            </Scrollbar>
            <Divider sx={{ background: 'black' }} />
            <ListItem >
              <IconButton onClick={handleDrawerClose}>
                {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </ListItem>
          </Drawer>
          
          {/* Body Content */}
          <Box
            component="main"
            overflow="auto"
            sx={{
              flexGrow: 1,
              pb: '60px',
              pl: '30px',
              pr: '30px',
              background: theme.colors.alpha.trueWhite[100]
            }}
          >
            <Toolbar
              sx={{
                height: 36
              }}
            />
            <Outlet />
          </Box>

          {/* //Footer */}
          {/* <Box
            component="footer"
            sx={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              margin: 0,
              zIndex:'999999',
              justifyContent: 'center',
              width: open
                ? `calc(100% - ${drawerWidth}px)`
                : 'calc(100% - 73px)',
              transition: 'width 0.3s'
            }}
          >
            <Footer />
          </Box> */}
        </Box>
    </>
  );
};

export default SidebarLayout;
