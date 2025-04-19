import {
  useTheme,
  Container,
  Grid,
  Link,
  Typography,
  styled
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

 

function Footer() {
  const theme = useTheme();

  const [currentDateTimeIST, setCurrentDateTimeIST] = useState('');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const updateDateTime = () => {
      const now = moment();
      const istOffset = 5.5 * 60; // IST offset in minutes
      const istTime = now.utcOffset(istOffset);
      setCurrentDateTimeIST(istTime.format('D MMM YYYY, HH:mm:ss'));
    };

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(intervalId);
  }, []);

  return ( 
      <Grid
        container
        spacing={2}
        mt={1}
        sx={{
          height: '28px',
          minHeight: '28px',
          background: '#F1F2F2',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginLeft: '0px'
          
        }}
      >
        {/* First Grid Item */}
        <Grid
          item
          xs={12}
          sm={5}
          display={'flex'}
          alignItems={'center'}
          sx={{
            justifyContent: { xs: 'center', md: 'start' },
            height: { xs: '30px', md: "28px" }
          }}
        >
          <Typography className="f-11">
            &copy; 2015-{currentYear} Crystal Power, Smart Grid Solutions
          </Typography>
        </Grid>
        <Grid
          item
          sm={2}
          sx={{
            display: {
              xs: 'none',
              sm: 'inline-block'
            }
          }}
        >
          <Typography className="f-10">Version 1.25</Typography>
        </Grid>
        <Grid
          item
          pr={1}
          xs={12}
          sm={5}
          sx={{
            height: '28px',
            background: theme.colors.alpha.primaryAlt[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 30px'
          }}
        >
          <Typography className="f-10">System time (IST)</Typography>
          <Typography className="f-14_500">{currentDateTimeIST}</Typography>
        </Grid>
      </Grid> 
  );
}

export default Footer;
