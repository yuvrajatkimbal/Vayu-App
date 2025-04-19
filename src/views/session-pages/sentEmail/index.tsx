import React from 'react'
import MainWrapper from '../component/MainWrapper'
import { Box, Typography } from '@mui/material'

const index = () => {
  return (
    <>
     <MainWrapper>
        <Box>
          <Box mt={3} mb={2}>
            <Typography className="f-25"> Forword Password </Typography>
          </Box>
          <Box>
          <Typography className="f-18"> A link to reset your password has been sent to your registered mail id. </Typography>  
          </Box> 
        </Box>
      </MainWrapper>
    </>
  )
}

export default index