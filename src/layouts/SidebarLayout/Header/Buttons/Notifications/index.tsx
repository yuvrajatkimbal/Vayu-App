import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadDetails, sendDownloadRequest } from "src/api/Meters";
import {
  NMSUserIcon,
  NotificationDotIcon,
  NotificationIcon,
  PeopleIcon,
  SettingsIcon,
  UnreadNotificationIcon
} from "src/assets/svg/svg";
import NotificationDrawer from "src/components/Drawer";
import {
  currentDay,
  getLocalStorage,
  startWeekday,
  startWeekdays
} from "src/utils/helper";
import HeaderUserbox from "../../Userbox";
import moment from "moment";

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const dispatch = useDispatch();

  const { downloadList } = useSelector((state: any) => state.meters);

  const [open, setOpen] = React.useState(false);
  // const [openAccountsMenu, setOpenAccountsMenu] = React.useState(false);

  const [isAnyUnwatched, setIsAnyUnwatched] = useState(false);
  const [unwatchedItems, setUnwatchedItems] = useState([]);
  const [unwatchedItemsArray, setUnwatchedItemsArray] = useState([]);

  // useEffect(() => {
  //   const hasUnwatchedItems = downloadList?.some(
  //     (item) => item?.isWatched === false
  //   );
  //   const filteredItems = downloadList?.filter(
  //     (item) => item?.isWatched === false
  //   );
  //   setUnwatchedItems(filteredItems);
  //   setIsAnyUnwatched(hasUnwatchedItems);
  // }, [downloadList]);

  useEffect(() => {
    // fetchNotificationDetails();
    // setInterval(() => {
    //   fetchNotificationDetails();
    // }, 120000); // 2 minutes in milliseconds
  }, []);

  useEffect(() => {
    if (unwatchedItems.length > 0) {
      const newArray = unwatchedItems?.map((item) => ({
        date: moment(item?.createdOn).format("YYYY-MM-DD"), // Gets the current day in "YYYY-MM-DD" format
        createdBy: getLocalStorage("userName"),
        headerRequired: item?.headerRequired, // Assuming this is the selectedColumnsString equivalent
        fileFormat: item?.fileFormat,
        requestId: item?.requestId,
        Project: getLocalStorage("project") || "null"
      }));
      setUnwatchedItemsArray(newArray);
    }
  }, [unwatchedItems]);

  // const fetchNotificationDetails = () => {
  //   dispatch(
  //     getDownloadDetails({
  //       createdBy: getLocalStorage('userName'),
  //       StartDate: startWeekdays,
  //       EndDate: currentDay,
  //       Project: getLocalStorage("project") || "null"
  //     })
  //   )
  //     .then((res) => {})
  //     .catch((err) => {});
  // };

  const [anchorEl, setAnchorEl] = useState(null);
  const openAccountsMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    // Add your logout logic here
    console.log("Logged out");
  };

  const toggleDrawer = () => {
    if (open && isAnyUnwatched) {
      const apiData = {
        downloadRequestModelList: unwatchedItemsArray
      };
      dispatch(sendDownloadRequest(apiData))
        .then((res) => {
          dispatch(
            getDownloadDetails({
              createdBy: getLocalStorage("userName"),
              StartDate: startWeekdays,
              EndDate: currentDay,
              Project: getLocalStorage("project") || "null"
            })
          )
            .then((res) => {})
            .catch((err) => {
              console.log("err", err);
            });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    setOpen((prevOpen) => !prevOpen);
    // fetchNotificationDetails();
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Tooltip title="Notifications">
          <Box
            className="cursor-pointer"
            component="div"
            marginRight={2}
            onClick={toggleDrawer}
          >
            <IconButton sx={{ padding: "4px", position: "relative" }}>
              {isAnyUnwatched ? (
                <Box>
                  <NotificationIcon />
                </Box>
              ) : (
                <UnreadNotificationIcon />
              )}
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="">
          <IconButton
            onClick={handleClick}
            sx={{ position: "relative", padding: "4px" }}
          >
            <NMSUserIcon />
          </IconButton>
        </Tooltip>
        <Menu
  anchorEl={anchorEl}
  open={openAccountsMenu}
  onClose={handleClose}
  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  transformOrigin={{ vertical: "top", horizontal: "right" }}
  PaperProps={{
    sx: {
      p: 0,
      mt: 1,
      // borderRadius: 2,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // soft dark shadow
      backgroundColor: "background.paper", // uses theme background
    },
  }}
  MenuListProps={{
    sx: {
      p: 0,
    },
  }}
>
  <MenuItem onClick={handleLogout} sx={{ color: "black", px: 2, py: 1 }}>
    Profile
  </MenuItem>
  <MenuItem onClick={handleLogout} sx={{ px: 2, py: 1 }}>
    Logout
  </MenuItem>
</Menu>

      </Box>

      <NotificationDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        direction={"right"}
      />
    </>
  );
}

export default HeaderNotifications;
