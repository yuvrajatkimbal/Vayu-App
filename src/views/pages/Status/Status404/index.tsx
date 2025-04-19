import { Box, Typography, Container, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { setPageTitle } from 'src/reducers/common';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Status404() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              The page you were looking for doesn't exist.
            </Typography>
          </Box>
          <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 3, p: 4 }}>
            <Button
              variant="outlined"
              sx={{
                color: '#000',
                border: '1px solid'
              }}
              onClick={() => {
                dispatch(setPageTitle('Commands'));
                navigate('/commands');
              }}
              // sx={{
              //   '&:hover': {
              //     color: '#1773BE' // Replace 'desiredHoverColor' with the color you want, e.g., 'red' or '#ff0000'
              //   }
              // }}
            >
              Go to homepage
            </Button>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
