import { GridCloseIcon } from '@mui/x-data-grid';
// import { CloseIcon } from 'src/assets/svg/svg';
import { useDispatch, useSelector } from 'react-redux';
import { currentDay } from 'src/utils/helper';
import { useEffect, useState } from 'react';
import AdvancedFilterButton from '../Button/AdvancedFilterButton';
import { requestedForEnum, tablesEnum } from 'src/utils/enums';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Stack,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  NMSNotificationErrorIcon,
  NMSNotificationRightIcon,
  NMSNotificationTickIcon
} from 'src/assets/svg/svg';
import {NotificationItem} from '../Notification/NotificationItem';

const DrawerWrapper = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '400px',
    padding: '1.2rem 0rem',
    // padding: '1.2rem 1.8rem',
    [theme.breakpoints.up('lg')]: {
      width: '480px',
      padding: '1.2rem 0rem'
      // padding: '1.2rem 2rem'
    }
  }
}));

const NotificationDrawer = ({ toggleDrawer, open, direction }) => {
  const theme = useTheme();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  const { downloadList } = useSelector((state: any) => state.meters);

  const downloadHandler = (url) => {
    window.open(url);
  };
  useEffect(() => {
    if (!open) setShowMore(false);
  }, [open]);



  const groupNotificationsByDate = (notifications) => {
    return notifications?.reduce((acc, notification) => {
      const date = moment(notification?.createdOn)
        ?.startOf('day')
        ?.format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date]?.push(notification);
      return acc;
    }, {});
  };

  const getSortedDates = (groupedData) => {
    return Object?.keys(groupedData)?.sort((a, b) =>
      moment(b)?.diff(moment(a))
    );
  };

  const getDisplayDate = (date) => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');
    const momentDate = moment(date);
    if (momentDate.isSame(today)) {
      return 'Today';
    } else if (momentDate.isSame(yesterday)) {
      return 'Yesterday';
    } else {
      return momentDate.format('DD MMM YYYY');
    }
  };

  const statusText = (value) => {
    switch (value) {
      case 1:
      case 2:
      case 3:
        return 'Pending';
      case 0:
      case 4:
        return 'Completed';
      case 5:
        return 'Failed';
    }
  };

  // const NotificationItem = ({ notification }) => (
  //   <Box
  //     padding={1}
  //     className="notification-box"
  //     sx={{
  //       background: notification?.isWatched
  //         ? theme.colors.alpha.trueWhite[100]
  //         : theme.colors.alpha.primaryAlt[100],
  //       padding: { sm: '12px 18px' }
  //     }}
  //   >
  //     <Box sx={{ marginBottom: 0.1 }}>
  //       <Typography variant="button" display="inline">
  //         Request Id : &nbsp;
  //       </Typography>
  //       <Typography display="inline" className="f-12">
  //         {notification?.requestId}
  //       </Typography>
  //     </Box>
  //     <Box sx={{ marginBottom: 0.1 }}>
  //       <Typography variant="button" display="inline">
  //         Requested For : &nbsp;
  //       </Typography>
  //       <Typography display="inline" className="f-12">
  //         {tableNameMap[notification?.tableName] || 'n/a'}
  //       </Typography>
  //     </Box>
  //     <Typography variant="button" display="inline">
  //       Download Status :{' '}
  //     </Typography>
  //     <Typography display="inline" className="f-12">
  //       {statusText(notification?.status)}
  //     </Typography>
  //     <Box sx={{ marginBottom: 0.1 }}>
  //       <Typography variant="button" display="inline">
  //         Created On : &nbsp;
  //       </Typography>
  //       <Typography display="inline" className="f-12">
  //         {moment(notification?.createdOn)
  //           // ?.add('+05:30')
  //           ?.format('DD-MM-YYYY HH:mm:ss A')}
  //       </Typography>
  //     </Box>
  //     <Box mt={1} display="flex" justifyContent="end">
  //       <IconButton
  //         sx={{
  //           cursor: notification?.generatedLink ? 'pointer' : 'not-allowed'
  //         }}
  //         disabled={!notification?.generatedLink}
  //       >
  //         <AdvancedFilterButton
  //           text="Download"
  //           onClick={() => downloadHandler(notification?.generatedLink)}
  //           disabled={!notification?.generatedLink}
  //           customSx={{
  //             background: notification?.generatedLink
  //               ? theme.colors.alpha.secondary[100]
  //               : '#EBEBE4',
  //             width: '150px !important',
  //             height: '32px !important',
  //             padding: '6px 15px'
  //           }}
  //         />
  //       </IconButton>
  //     </Box>
  //   </Box>
  // );

  const isRecentDate = (date) => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');
    const momentDate = moment(date);
    return momentDate.isSame(today) || momentDate.isSame(yesterday);
  };

  const groupedNotifications = groupNotificationsByDate(downloadList);
  const sortedDates = getSortedDates(groupedNotifications);

  const recentDates = sortedDates?.filter((date) => isRecentDate(date));
  const olderDates = sortedDates?.filter((date) => !isRecentDate(date));



  return (
    <>
      <DrawerWrapper open={open} onClose={toggleDrawer} anchor={'right'}>
        <Box
          mb={2}
          className="d-flex-justify-between"
          sx={{
            padding: '0px 24px'
          }}
        >
          <Typography ml={2} variant="h6" className="f-20">
            Notifications
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          className='f-16_400'
          color="#808089"
          mb={1}
          sx={{
            padding: '0px 24px'
          }}
        >
          This week
        </Typography>

        <NotificationItem
          status="success"
          message="downloaded"
          time="10:30 AM, 3 April 2024"
        />
        <NotificationItem
          status="success"
          message="downloaded"
          time="10:30 AM, 3 April 2024"
        />
        <NotificationItem
          status="success"
          message="downloaded"
          time="10:30 AM, 3 April 2024"
        />
        <NotificationItem
          status="error"
          message="downloaded"
          time="10:30 AM, 3 April 2024"
          retry
        />

        <Typography
          color="#808089"
          className='f-16_400'
          mt={2}
          mb={2}
          sx={{
            padding: '0px 24px'
          }}
        >
          Previous week
        </Typography>

        <NotificationItem
          status="success"
          message="downloaded"
          time="10:30 AM, 3 April 2024"
        />
        <NotificationItem
          status="success"
          message="downloaded"
          time="10:30 AM, 3 April 2024"
        />
        <NotificationItem
          status="success"
          message="downloaded"
          time="10:30 AM, 3 April 2024"
        />
        <NotificationItem
          status="success"
          message="downloaded"
          time="4 minutes ago"
        />
        {/* {recentDates.map((date) => (
          <Box key={date}>
            <Box mb={1} className="d-flex-justify-between">
              <Typography ml={2} variant="h6" className="f-18">
                {getDisplayDate(date)}
              </Typography>
            </Box>
            {groupedNotifications[date].map((notification, index) => (
              <NotificationItem key={index} notification={notification} />
            ))}
          </Box>
        ))}

        {olderDates?.length > 0 && recentDates?.length > 0 && (
          <Box display="flex" justifyContent="center" mt={2} mb={3}>
            <Typography
              variant="button"
              sx={{ cursor: 'pointer', color: theme.colors.alpha.black }}
              onClick={toggleShowMore}
            >
              {showMore ? 'See Less' : 'See More'}
            </Typography>
          </Box>
        )}

        {recentDates?.length === 0
          ? olderDates.map((date) => (
              <Box key={date}>
                <Box mb={1} className="d-flex-justify-between">
                  <Typography ml={2} variant="h6" className="f-18">
                    {getDisplayDate(date)}
                  </Typography>
                </Box>
                {groupedNotifications[date].map((notification, index) => (
                  <NotificationItem key={index} notification={notification} />
                ))}
              </Box>
            ))
          : showMore &&
            olderDates.map((date) => (
              <Box key={date}>
                <Box mb={1} className="d-flex-justify-between">
                  <Typography ml={2} variant="h6" className="f-18">
                    {getDisplayDate(date)}
                  </Typography>
                </Box>
                {groupedNotifications[date].map((notification, index) => (
                  <NotificationItem key={index} notification={notification} />
                ))}
              </Box>
            ))} */}
      </DrawerWrapper>
    </>
  );
};

export default NotificationDrawer;
