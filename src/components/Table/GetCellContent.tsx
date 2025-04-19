import {
  convertTimeFormat,
  convertUTCtoIST,
  formatDateColumn,
  formatTime,
  formatTimestamp,
  getDateAndTime,
  isPayloadColumn,
  isPayloadColumnId,
  secondsToMint,
  secondsToMinutes
} from "src/utils/helper";
import { StyledTableCell } from "../StyledComponents/Table";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { EditIcon, RightTableIcon } from "src/assets/svg/svg";
import moment from "moment";
import CommandStatusChip from "../CommandStatus";
import { roleNames, tabsEnum } from "src/utils/const";
import { CustomSwitch } from "../CustomSwitch";
import { commandNameEnum } from "src/utils/enums";
import { hasPermission } from "src/utils/permission";
import { useSelector } from "react-redux";
import {
  StatusBox,
  StatusBoxOffline,
  StatusBoxOnline
} from "src/assets/styledComponent/BoxStyled";
import SeverityLabel from "src/components/Labels/SeverityLabel";

interface GetCellContentProps {
  column?: any;
  row?: any;
  handleNavigation?: any;
  routeType?: any;
  checkBoxes?: any;
  action?: any;
  handleButtonClick?: any;
  handleChange?: any;
  cellContent?: any;
}
const getCellContent = ({
  column,
  row,
  handleNavigation,
  routeType,
  checkBoxes,
  action,
  handleButtonClick,
  handleChange,
  cellContent
}: GetCellContentProps) => {
  const theme = useTheme();

  // const getCellValue = (row, columnId) => {
  //   const commandDetail = row?.commandDetail;

  //   switch (columnId) {
  //     case ColumnEnum.SUCCESS_UNDER_15_MINS:
  //       return commandDetail?.[0]?.successCount ?? null;
  //     case ColumnEnum.SUCCESS_PERCENT_UNDER_15_MINS:
  //       return commandDetail?.[0]?.successPercentage ?? null;
  //     case ColumnEnum.SUCCESS_UNDER_6_HOURS:
  //       return commandDetail?.[1]?.successCount ?? null;
  //     case ColumnEnum.SUCCESS_PERCENT_UNDER_6_HOURS:
  //       return commandDetail?.[1]?.successPercentage ?? null;
  //     case ColumnEnum.SUCCESS_OVER_6_HOURS:
  //       return commandDetail?.[2]?.successCount ?? null;
  //     case ColumnEnum.SUCCESS_PERCENT_OVER_6_HOURS:
  //       return commandDetail?.[2]?.successPercentage ?? null;
  //     default:
  //       return null;
  //   }
  // };

  switch (column.id) {
    /////////////////////////////////////////////////////For NMS Start//////////////////////////////////////////////////

    // case 'nodeId':
    //   return cellContent(column, row);

    case "id":
      return cellContent(column, row);

    ///////////////////////////////////////////////////////For NMS END/////////////////////////////////////////////////////
    case "completedon":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
        >
          <span>{formatTimestamp(row.completedOn)}</span>
        </StyledTableCell>
      );
    case "meterNo":
      if (!location.pathname.includes("/historical")) {
        return action(column, row);
      } else {
        return (
          <StyledTableCell
            key={column.id}
            align={column.align}
            style={{
              width: column.width,
              minWidth: column.width,
              // color: getRowColor(row),
              textAlign: "center"
            }}
          >
            <span>{row.meterNo ??'-'}</span>
          </StyledTableCell>
        );
      }
    case "time":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
        >
          <span>{formatTimestamp(row.timestamp)}</span>
        </StyledTableCell>
      );
    case "event":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
        >
          <span>{row.title}</span>
        </StyledTableCell>
      );
    case "severity":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
        >
          <SeverityLabel severity={row.severity} />
        </StyledTableCell>
      );
    case "desc":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
        >
          <span>{row.description}</span>
        </StyledTableCell>
      );
    case "isActive":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span> {row.isActive ? "Yes" : "No"}</span>
        </StyledTableCell>
      );
    case "isSuccessful":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>
            {" "}
            {row.isSuccessful === true
              ? "true"
              : row.isSuccessful === false
              ? "false"
              : row.isSuccessful === null
              ? ""
              : ""}
          </span>
        </StyledTableCell>
      );
    case "completedOn":
        return (
          <StyledTableCell
            key={column.id}
            align={column.align}
            style={{
              width: column.width,
              minWidth: column.width,
              // color: getRowColor(row),
              textAlign: 'center'
            }}
          >
            <span>{formatTimestamp(row.completedOn)}</span>
          </StyledTableCell>
        
      );
    case "driftInSeconds":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>{secondsToMint(row.driftInSeconds)}</span> <br />
          <span className="f-12">{`( ${formatTime(
            row.driftInSeconds
          )} )`}</span>
        </StyledTableCell>
      );
    // case 'roleName':
    //   return (
    //     <StyledTableCell
    //       key={column.id}
    //       align={column.align}
    //       style={{
    //         width: column.width,
    //         minWidth: column.width,
    //         // color: getRowColor(row),
    //         textAlign: 'center'
    //       }}
    //       sx={{
    //         '&:hover': {
    //           backgroundColor: isPayloadColumn(column.id)
    //             ? theme.colors.alpha.primary[100] // Change this to your desired hover color
    //             : 'inherit'
    //         }
    //       }}
    //     >
    //       <span style={{textTransform: 'capitalize'}}>
    //         {row.roleName === 'user'
    //           ? 'User'
    //           : row.roleName === 'superuser'
    //           ? 'Super User'
    //           : row.roleName === 'admin'
    //           ? 'Admin'
    //           : row.roleName === 'superadmin'
    //           ? 'Super Admin'
    //           : row.roleName}
    //       </span>{' '}
    //       <br />
    //     </StyledTableCell>
    //   );
    case "commandType":
      const matchedCommandName = Object.keys(commandNameEnum).find(
        (key) => commandNameEnum[key] === row.commandType
      );
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span className="f-12">{matchedCommandName || row.commandType}</span>
        </StyledTableCell>
      );
    case "lastTriedOn":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>
            {" "}
            {row.lastTriedOn === "0001-01-01T00:00:00"
              ? ""
              : moment(row.lastTriedOn).format("DD-MM-YYYY hh:mm:ss A")}
          </span>
        </StyledTableCell>
      );
    case "lastRecordReceivedOnIst":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>
            {row?.lastRecordReceivedOnIst
              ? moment(row.lastRecordReceivedOnIst).format(
                  "DD-MM-YYYY hh:mm:ss A"
                )
              : ""}
          </span>
        </StyledTableCell>
      );
    case "createdDateIst":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>
            {moment(row.createdDateIst).format("DD-MM-YYYY hh:mm:ss A")}
          </span>
        </StyledTableCell>
      );
    case "lastAccess":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>{moment(row.lastAccess).format("DD-MM-YYYY hh:mm:ss A")}</span>
        </StyledTableCell>
      );
    case "rtcDateTimeUtc":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>
            {moment(row.rtcDateTimeUtc).format("DD-MM-YYYY hh:mm:ss A")}
          </span>
        </StyledTableCell>
      );
    case "firstCommunicationOn":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>
            {moment(row.firstCommunicationOn)
              .utc()
              .format("DD-MM-YYYY hh:mm:ss A")}
          </span>
        </StyledTableCell>
      );

    // case 'lastCommunicatedOn': {
    //   const formattedDate = location.pathname.includes('/historical-routings') || location.pathname.includes('/meter-detail')
    //     ? moment(row.lastCommunicatedOn).format('DD-MM-YYYY hh:mm:ss A')
    //     : moment(row.lastCommunicatedOn).utc().format('DD-MM-YYYY hh:mm:ss A');

    //   return (
    //     <StyledTableCell
    //       key={column.id}
    //       align={column.align}
    //       style={{
    //         width: column.width,
    //         minWidth: column.width,
    //         textAlign: 'center'
    //       }}
    //       sx={{
    //         '&:hover': {
    //           backgroundColor: isPayloadColumn(column.id)
    //             ? theme.colors.alpha.primary[100] // Change this to your desired hover color
    //             : 'inherit'
    //         }
    //       }}
    //     >
    //       <span>{formattedDate}</span>
    //     </StyledTableCell>
    //   );
    // }

    case "lastCommunicatedOn":
      if (location.pathname.includes("/historical-routings")) {
        return (
          <StyledTableCell
            key={column.id}
            align={column.align}
            style={{
              width: column.width,
              minWidth: column.width,
              // color: getRowColor(row),
              textAlign: "center"
            }}
            sx={{
              "&:hover": {
                backgroundColor: isPayloadColumn(column.id)
                  ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                  : "inherit"
              }
            }}
          >
            <span>
              {moment(row.lastCommunicatedOn).format("DD-MM-YYYY hh:mm:ss A")}
            </span>
          </StyledTableCell>
        );
      } else if (
        localStorage?.activeRouting === '"All"' &&
        location.pathname.includes("/meter-detail")
      ) {
        return (
          <StyledTableCell
            key={column.id}
            align={column.align}
            style={{
              width: column.width,
              minWidth: column.width,
              // color: getRowColor(row),
              textAlign: "center"
            }}
            sx={{
              "&:hover": {
                backgroundColor: isPayloadColumn(column.id)
                  ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                  : "inherit"
              }
            }}
          >
            <span>
              {moment(row.lastCommunicatedOn).format("DD-MM-YYYY hh:mm:ss A")}
            </span>
          </StyledTableCell>
        );
      } else if (
        localStorage?.activeRouting === '"Latest IP"' &&
        location.pathname.includes("/meter-detail")
      ) {
        return (
          <StyledTableCell
            key={column.id}
            align={column.align}
            style={{
              width: column.width,
              minWidth: column.width,
              // color: getRowColor(row),
              textAlign: "center"
            }}
            sx={{
              "&:hover": {
                backgroundColor: isPayloadColumn(column.id)
                  ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                  : "inherit"
              }
            }}
          >
            <span>
              {moment(row.lastCommunicatedOn)
                .utc()
                .format("DD-MM-YYYY hh:mm:ss A")}
            </span>
          </StyledTableCell>
        );
      } else {
        return (
          <StyledTableCell
            key={column.id}
            align={column.align}
            style={{
              width: column.width,
              minWidth: column.width,
              // color: getRowColor(row),
              textAlign: "center"
            }}
            sx={{
              "&:hover": {
                backgroundColor: isPayloadColumn(column.id)
                  ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                  : "inherit"
              }
            }}
          >
            <span>
              {moment(row.lastCommunicatedOn)
                .utc()
                .format("DD-MM-YYYY hh:mm:ss A")}
            </span>
          </StyledTableCell>
        );
      }
    case "serverTime":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>{moment(row.serverTime).format("DD-MM-YYYY hh:mm:ss A")}</span>
        </StyledTableCell>
      );
    case "rtcDateTime":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>{moment(row.rtcDateTime).format("DD-MM-YYYY hh:mm:ss A")}</span>
        </StyledTableCell>
      );
    case "lastUpdateTime":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>
            {moment(row.lastUpdateTime).utc().format("DD-MM-YYYY hh:mm:ss A")}
          </span>
        </StyledTableCell>
      );
    case "createdAt":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>{moment(row.createdAt).format("DD-MM-YYYY hh:mm:ss A")}</span>
        </StyledTableCell>
      );
    case "eventLogList":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100]
                : "inherit"
            }
          }}
        >
          {row?.eventLogList.map((event, index) => (
            <div key={index}>
              {event}
              {index < row.eventLogList.length - 1 ? ", " : ""}
            </div>
          ))}
        </StyledTableCell>
      );
    case "createdDate":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>{moment(row.createdDate).format("DD-MM-YYYY hh:mm:ss A")}</span>
        </StyledTableCell>
      );
    case "rtcDateTimeIst":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span>
            {moment(row.rtcDateTimeIst).format("DD-MM-YYYY hh:mm:ss A")}
          </span>
        </StyledTableCell>
      );
    case "status":
      return (
        <StyledTableCell
          key={column.id}
          // align="center"
          style={{
            width: column.width,
            minWidth: column.width
            // color: getRowColor(row),
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          {row.status === "Online" ? (
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Box pr={1}>
                <StatusBoxOnline />
              </Box>
              <Typography>{row.status}</Typography>
            </Box>
          ) : (
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Box pr={1}>
                <StatusBoxOffline />
              </Box>
              <Typography>{row.status}</Typography>
            </Box>
          )}
        </StyledTableCell>
      );
    case "mdmStatus":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <CommandStatusChip status={row.mdmStatus} />
        </StyledTableCell>
      );
    case "bulkId":
      return cellContent(column, row);
    case "gatewayId":
      if (routeType === tabsEnum.GATEWAYLOAD) {
        return (
          <StyledTableCell
            className="cursor-pointer"
            key={column.id}
            align={column.align}
            onClick={() => handleNavigation(row)}
            style={{
              // ...bodyCellStyle,
              width: column.width,
              minWidth: column.width,
              // color: getRowColor(row),
              textAlign: "center"
            }}
            sx={{
              "&:hover": {
                backgroundColor: isPayloadColumn(column.id)
                  ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                  : "inherit"
              }
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"center"}
              pl={1}
            >
              <Box mr={5}>{row.gatewayId}</Box>
              <RightTableIcon />
            </Box>
          </StyledTableCell>
        );
      } else {
        return (
          <StyledTableCell
            // className="cursor-pointer"
            key={column.id}
            align={column.align}
            style={{
              width: column.width,
              minWidth: column.width,
              // color: getRowColor(row),
              textAlign: "center"
            }}
            // sx={{
            //   '&:hover': {
            //     backgroundColor: isPayloadColumn(column.id)
            //       ? theme.colors.alpha.primary[100]
            //       : 'inherit'
            //   }
            // }}
          >
            <span>{row.gatewayId}</span>
          </StyledTableCell>
        );
      }
    case "veeManage":
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
        >
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box
              className="cursor-pointer"
              mr={1}
              onClick={(e) => handleButtonClick(row)}
            >
              <IconButton>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // setIsDisabled(true);
                    // setFormDisable(false);
                  }}
                  sx={{
                    borderRadius: 0,
                    width: 38,
                    height: 35,
                    border: `1px solid ${theme.colors.alpha.black[100]}`,
                    backgroundColor: theme.colors.alpha.trueWhite[100],
                    padding: "11px 10px !important",
                    minWidth: "unset",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <EditIcon />
                </Button>
              </IconButton>
            </Box>

            <Box>
              <CustomSwitch
                onChange={(e) => handleChange(e, row)}
                checked={row.isActive} // Pass checked prop here
              />
            </Box>
          </Box>
        </StyledTableCell>
      );
    case "accessManagement":
      return action(column, row);
    // case 'checkbox':
    //   return checkBoxes(column, row);
    // case ColumnEnum.SUCCESS_UNDER_15_MINS:
    // case ColumnEnum.SUCCESS_PERCENT_UNDER_15_MINS:
    // case ColumnEnum.SUCCESS_UNDER_6_HOURS:
    // case ColumnEnum.SUCCESS_PERCENT_UNDER_6_HOURS:
    // case ColumnEnum.SUCCESS_OVER_6_HOURS:
    // case ColumnEnum.SUCCESS_PERCENT_OVER_6_HOURS: {
    //   const value = getCellValue(row, column?.id);
    //   return (
    //     <StyledTableCell
    //       key={column.id}
    //       align={column.align}
    //       style={{
    //         width: column.width,
    //         minWidth: column.width,
    //         textAlign: 'center'
    //       }}
    //     >
    //       <span>{value !== null ? value : null}</span>
    //     </StyledTableCell>
    //   );
    // }
    case "yearMonthDayIST": {
      return cellContent(column, row);
    }
    default:
      return (
        <StyledTableCell
          key={column.id}
          align={column.align}
          style={{
            width: column.width,
            minWidth: column.width,
            // color: getRowColor(row),
            textAlign: "center"
          }}
          sx={{
            "&:hover": {
              backgroundColor: isPayloadColumn(column.id)
                ? theme.colors.alpha.primary[100] // Change this to your desired hover color
                : "inherit"
            }
          }}
        >
          <span> {formatDateColumn(column.id, row[column.id])}</span>
        </StyledTableCell>
      );
  }
};

export default getCellContent;
