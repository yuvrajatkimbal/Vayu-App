import React from 'react';
import { useLocation } from 'react-router';
import MainWrapper from '../component/MainWrapper';
import { Box, Typography } from '@mui/material';

const index = () => { 
    const { pathname } = useLocation();
    const pathSegments = pathname.split('/');
    const isSuccess = pathSegments[pathSegments.length - 1] === 'success'; 
    return (
        <>
            <MainWrapper>
                <Box>
                    <Box mt={3} mb={2}>
                        <Typography className="f-25"> Reset Password </Typography>
                    </Box>
                    <Box>

                        {isSuccess ?
                            <Typography className="f-18">
                                Password has been set was successful! Login with your new
                                password.
                            </Typography> : <>
                                <Typography className="f-18">
                                    Password reset was unsuccessful.
                                </Typography>
                            </>
                        }
                    </Box>
                </Box>
            </MainWrapper>
        </>
    );
};

export default index;
