import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { NotFound } from 'src/assets/svg/svg';

const index = () => {
  return (
    <>
      <Box
        mt={1.5}
        sx={{
          height: 'calc(100vh - 270px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Paper
          sx={{
            borderRadius: '0px !important',
            boxShadow: 'none',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <NotFound />
          <Typography className="f-20" mt={1}>
            No Records Found
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default index;
