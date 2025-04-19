import React from 'react';
import MainWrapper from '../component/MainWrapper';
import {
  Box,
  Checkbox,
  Grid,
  ListItemText,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';

const index = () => {
  const theme = useTheme();

  const StatusBox = styled(Box)({
    height: '19px',
    width: '19px',
    margin: '5px 10px 5px 0px',

    background: theme.colors.alpha.secondary[100],
    border: `1px solid ${theme.colors.alpha.black[100]}`
  });
  const columnsOptions = [
    { id: 1, label: 'Length – 8' },
    { id: 2, label: 'Upper Case' },
    { id: 3, label: 'Lower Case' },
    { id: 4, label: 'Special Character' }
  ];

  return (
    <>
      <MainWrapper>
        <Box>
          <Box mt={3} mb={2}>
            <Typography className="f-25"> Reset Password </Typography>
          </Box>
          <Box>
            <Box>
              <TextField
                fullWidth
                type="text"
                className="custom-textfield f-10"
                id="outlined-basic"
                placeholder="New password"
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                type="text"
                className="custom-textfield f-10"
                id="outlined-basic"
                placeholder="Confirm-password"
              />
            </Box>
            <Box mt={1}>
              {columnsOptions.map((column) => (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StatusBox />
                    <Typography className="f-15 "> {column.label}</Typography>
                  </Box>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      </MainWrapper>
    </>
  );
};

export default index;
