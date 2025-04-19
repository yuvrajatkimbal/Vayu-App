import React from 'react'
import MainWrapper from '../component/MainWrapper'
import { Box, TextField, Typography } from '@mui/material'

const index = () => {
  return (
    <>
     <MainWrapper>
        <Box>
          <Box mt={3} mb={2}>
            <Typography className="f-25"> Forword Password </Typography>
          </Box>
          <Box>
            <TextField             
              fullWidth
              type="text"
              className="custom-textfield f-10"
              id="outlined-basic"
              placeholder="Enter your email id here"
            />
          </Box> 
        </Box>
      </MainWrapper>
    
    </>
  )
}

export default index