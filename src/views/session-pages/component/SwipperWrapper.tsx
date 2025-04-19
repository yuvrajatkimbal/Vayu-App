import { Box, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SwipperWrapperProps {
  children: ReactNode;
}

const SwipperWrapper: React.FC<SwipperWrapperProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', background: '#fff' }}>
      <Grid container spacing={0} columns={12}>
        <Grid
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 4,
          }}
          item
          sm={12}
          md={7}
        >
          {/* Optional Swipper Component */}
          {/* <Swipper /> */}
          <Typography sx={{ fontSize:28,fontWeight:"bold" }}>
            Welcome to Vayu App
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={5}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: '100vh', px: 4 }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SwipperWrapper;
