import { useTheme } from "@emotion/react";
import { Box, ListItemIcon, Typography, Stack, Button } from "@mui/material";
import { NMSNotificationErrorIcon, NMSNotificationTickIcon, NMSNotificationRightIcon } from "src/assets/svg/svg";
import ReplayIcon from '@mui/icons-material/Replay';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const NotificationItem = ({ status, message, time, retry = false }) => {
    const theme = useTheme();
    const isError = status === 'error';

    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor={retry || isError ? '#F9EDED' : '#F2F7FF'}
        mb={1.5}
        sx={{
          padding: '18px 24px'
        }}
      >
        <Box display="flex">
          <ListItemIcon sx={{
            width: "20px"
          }}>
          {isError ? (
            <NMSNotificationErrorIcon sx={{ color: '#F44336' }} />
          ) : (
            <NMSNotificationTickIcon sx={{ color: '#00C851' }} />
          )}
          </ListItemIcon>
          <Box
            sx={{
              paddingLeft: '15px'
            }}
          >
            <Typography className="f-16">
              <strong>{'<Report name>'}</strong> has been{' '}
              {retry ? 'downloaded' : message} successfully.
            </Typography>
            <Typography className='f-14_400' color="#808089">
              {time}
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <FiberManualRecordIcon sx={{ color: '#1976D2', fontSize: 12 }} />
          {retry ? (
            <Button
              variant="text"
              className="f-16"
              endIcon={<ReplayIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, color: '#1773BE' }}
            >
              Retry
            </Button>
          ) : (
            <Button
              variant="text"
              className="f-16"
              endIcon={<NMSNotificationRightIcon sx={{ fontSize: 14 }} />}
              sx={{ textTransform: 'none', fontWeight: 600, color: '#1773BE' }}
            >
              downloaded
            </Button>
          )}
        </Stack>
      </Box>
    );
  };