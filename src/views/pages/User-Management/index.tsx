import styled from '@emotion/styled';
import { Box, Container, Grid, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomBackdrop from 'src/components/CustomBackdrop/CustomBackdrop';
import CustomTabPanel from '../../../components/CustomTabPanel';
import Footer from 'src/components/Footer';
import RoleManagement from './Component/RoleManagement';
import UserManagement from './Component/UserManagement';
import { hasPermission } from 'src/utils/permission';
import { useSelector } from 'react-redux';

const FullWidthTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    display: 'flex'
  },
  '& .MuiTabs-indicator': {
    height: '2px',
    bottom: 0
  }
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  flex: 1,
  maxWidth: 'none',
  // height: '45px',
  // minHeight: '45px',
  padding: 8,
  textTransform: 'none',
  // fontWeight: theme.typography.fontWeightRegular,
  fontSize: '16px',
  '&.seleted-tab': {
    // fontWeight: theme.typography.fontWeightMedium
  },
  '&.tab-btn': {
    fontSize: '16px !important',
    fontWeight: '500 !important'
  },
  '& .MuiTab-wrapper': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
}));

const index = () => {
  const { moduleListByRole } = useSelector((state: any) => state.auth);
  const { permission } = useSelector((state: any) => state.accessManagement);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  // const [activeHeader, setActiveHeader] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // useEffect(() => {
  //   const hasRoleManagementPermission = hasPermission(
  //     moduleListByRole,
  //     permission?.Access_Management_Role_Management
  //   );

  //   const hasUserManagementPermission = hasPermission(
  //     moduleListByRole,
  //     permission?.Access_Management_User_Management
  //   );

  //   if (hasRoleManagementPermission && hasUserManagementPermission) {
  //     setActiveHeader(true);
  //     setTabValue(0);
  //   } else if (hasRoleManagementPermission) {
  //     setActiveHeader(false);
  //     setTabValue(1);
  //   } else if (hasUserManagementPermission) {
  //     setActiveHeader(false);
  //     setTabValue(0);
  //   }
  // }, [moduleListByRole, permission]);
  return (
    <>
      {loading && <CustomBackdrop open={loading} />}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Box marginTop={6} sx={{ width: '100%' }}>
          {/* {activeHeader && ( */}
            <Box>
              <FullWidthTabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <CustomTab
                  className="seleted-tab tab-btn"
                  label="User Management"
                />
                <CustomTab
                  className="seleted-tab tab-btn"
                  label="Role Management"
                />
              </FullWidthTabs>
            </Box>
          {/* )} */}
          <CustomTabPanel value={tabValue} index={0}>
            <UserManagement />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <RoleManagement />
          </CustomTabPanel>
        </Box>
      </Grid>
    </>
  );
};

export default index;
