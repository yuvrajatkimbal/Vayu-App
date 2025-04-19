import { useContext, useEffect, useState } from 'react';
import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Collapse,
  Divider,
  useTheme,
  darken
} from '@mui/material';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from 'src/reducers/common';
import {vayuSidebarItems } from 'src/utils/_nav';
import {
  MenuWrapper,
  SubMenuWrapper
} from 'src/assets/styledComponent/SidebarStyled';
import { hasPermission } from 'src/utils/permission';
import { getModuleListByRoleAction } from 'src/api/auth';
import { setActiveSession } from 'src/reducers/auth';
import { NMSBackIcon } from 'src/assets/svg/svg';
import { projects } from 'src/utils/const';

const SidebarMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { permission } = useSelector((state: any) => state.accessManagement);
  const { moduleListByRole } = useSelector((state: any) => state.auth);
  const { closeSidebar } = useContext(SidebarContext);
  const [activePage, setActivePage] = useState('');

  const handleSidebar = (title: string) => {
    closeSidebar();
    setActivePage(title);
    dispatch(setPageTitle(title));
  };

  useEffect(() => {
    vayuSidebarItems?.find((item) => {
      if (item.path === location.pathname) setActivePage(item.name);
    });

    // Extract base path (first two segments)
    const basePath = '/' + location.pathname.split('/')[1];

    const activeItem = vayuSidebarItems.find((item) => {
      return (
        item.path === basePath ||
        (item.path.endsWith('s') && item.path.slice(0, -1) === basePath)
      );
    });

    if (activeItem) {
      setActivePage(activeItem.name);
    } else {
      console.log('No active item found!');
    }
  }, [location.pathname]);

  return (
    <>
      <MenuWrapper
        sx={{
          overflowX: 'hidden'
        }}
      >
        {/* {activeProject === projects?.NMS && (
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={() => sidebarHandler()}
                  to="/meters"
                  startIcon={<NMSBackIcon />}
                >
                  Back to EHES
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        )} */}
        <SubMenuWrapper>
          <List component="div">
            {vayuSidebarItems?.map((item) => {
              if (
                item.key === 'routings' &&
                !hasPermission(
                  moduleListByRole,
                  permission?.Routings_Current_Routings_Search_Download
                )
              ) {
                return null;
              } else if (item.key === 'reports') {
                if (
                  !moduleListByRole?.moduleListByRole?.some(
                    (i) => i.screen.toLowerCase() === 'reports'
                  )
                ) {
                  return null;
                }
              } else if (
                item.key === 'RTC-Details' &&
                !hasPermission(
                  moduleListByRole,
                  permission?.RTC_Detail_Current_RTC
                )
              ) {
                return null;
              }
              return (
                <ListItem component="div" key={item.name}>
                  <Button
                    disableRipple
                    component={RouterLink}
                    className={activePage === item.name ? 'active' : ''}
                    onClick={() => handleSidebar(item.name)}
                    to={item.path}
                    startIcon={
                      activePage === item.name ? (
                        <item.activeIcon />
                      ) : (
                        <item.icon />
                      )
                    }
                  >
                    {item.name}
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </SubMenuWrapper>
      </MenuWrapper>
    </>
  );
};

export default SidebarMenu;
