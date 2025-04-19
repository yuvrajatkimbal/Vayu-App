import {
  Box,
  Button,
  FormControl,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import {
  CustomMenuItem,
  CustomSelect,
  CustomSelectIcon,
  CustomSelectInput
} from '../CustomSelectMenu';
import { profilesEnum } from 'src/utils/enums';
import DateRangePicker from '../DateRange/DateRangePicker';
import { inputStyles } from 'src/utils/helper';

interface DrawerInterface {
  toggleDrawer?: any;
  open?: any;
  columns?: any;
  handleSelectAll?: any;
  handleDeselectAll?: any;
  handleToggleSelection?: any;
  isShow?: any;
  formatName?: any;
  selectedColumns?: any;
  handleFormatChange?: any;
  isDisabled?: any;
  downloadHandler?: any;
  filterType?: any;
  startDate?: any;
  endDate?: any;
  dateRangeHandler?: any;
  handleCommandType?: any;
  filtersData?: any;
  startDateisDownload?: any;
  endDateisDownload?: any;
  activeProfile?: string;
}

const Download: React.FC<DrawerInterface> = ({
  toggleDrawer,
  open,
  columns,
  handleSelectAll,
  handleDeselectAll,
  handleToggleSelection,
  isShow,
  formatName,
  selectedColumns,
  handleFormatChange,
  isDisabled,
  filterType,
  // downloadHandler,
  // startDateisDownload,
  // endDateisDownload,
  // dateRangeHandler,
  // handleCommandType,
  // filtersData,
  // activeProfile
}) => {
  const theme = useTheme(); 
  return (
    <>
      <Box display="flex" flexDirection="column" gap={1.2}>
        <Box mt={2} display="flex" gap={1}>
          {!isShow && (
            <Button
              variant="contained"
              onClick={handleSelectAll}
              className="select-all-button"
              sx={{
                background: theme.colors.alpha.primary[100],
                color: theme.colors.alpha.black[100],
                border: `1px solid ${theme.colors.alpha.black[100]}`,
                fontSize: '15px',
                fontWeight: '500'
              }}
            >
              Select All
            </Button>
          )}
          {isShow && (
            <Button
              variant="contained"
              onClick={handleDeselectAll}
              className="deselect-all-button"
              sx={{
                background: theme.colors.alpha.secondary[100],
                color: theme.colors.alpha.black[100],
                border: `1px solid ${theme.colors.alpha.black[100]}`,
                fontSize: '15px',
                fontWeight: '500'
              }}
            >
              Deselect All
            </Button>
          )}
        </Box>

        {/* <Grid container mt={1}>
          {columns?.map((item) => {
            const isSelected = selectedColumns.has(item.id);
            return (
              <Grid
                item
                xs={12}
                md={5.8}
                sx={{
                  border: '1px solid black',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '20px',
                  background: isSelected
                    ? theme.colors.alpha.primary[100]
                    : theme.colors.alpha.primaryAlt[100],
                  height: '44px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginRight: '6px',
                  marginY: '3px',
                  fontFamily: 'Geist'
                }}
                onClick={() => handleToggleSelection(item.id)}
                key={item.id}
              >
                <Box>{item.isfileName ? item.fileName : item?.label}</Box>
              </Grid>
            );
          })}
        </Grid> */}

        <Grid container mt={1}>
          {(() => {
            let obisDataAdded = false; // Track if ObisData has been added
            return columns
              ?.reduce((acc, item) => {
                // Check if id includes "0"
                if (item.id.includes('0')) {
                  // Add ObisData column only once
                  if (!obisDataAdded) {
                    acc.push({
                      id: 'ObisData',
                      label: 'Energy Parameters',
                      isfileName: false // Adjust based on your needs
                    });
                    obisDataAdded = true; // Mark that ObisData column has been added
                  }
                } else {
                  // Update label and id for Event Log List
                  if (
                    item.id === 'eventLogList' &&
                    profilesEnum?.EVENTLOG === filterType
                  ) {
                    item.id = 'eventname';
                    item.label = 'Event Name';
                  }

                  // If it doesn't include "0", keep the original column
                  acc.push(item);
                }
                return acc;
              }, [])
              .map((item) => {
                const isSelected = selectedColumns.has(item.id);
                return (
                  <Grid
                    item
                    xs={12}
                    md={5.8}
                    sx={{
                      border: '1px solid black',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '20px',
                      background: isSelected
                        ? theme.colors.alpha.primary[100]
                        : theme.colors.alpha.trueWhite[100],
                      height: '44px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      marginRight: '6px',
                      marginY: '3px',
                      fontFamily: theme.typography.fontFamily
                    }}
                    onClick={() => handleToggleSelection(item.id)}
                    key={item.id}
                  >
                    <Box>{item.isfileName ? item.fileName : item?.label}</Box>
                  </Grid>
                );
              });
          })()}
        </Grid>

        <Box mt={1}>
          {/* {((filtersData?.MeterNumberList?.length > 10 ||
            filtersData?.MeterNumberList?.length === 0) && activeProfile !== profilesEnum?.BILLINGPROFILE )&&  (
            <Box mt={2} mb={2}>
              <Box display={'flex'}>
                <DateRangePicker
                  startDate={startDateisDownload}
                  endDate={endDateisDownload}
                  dateRangeHandler={dateRangeHandler}
                  handleCommandType={handleCommandType}
                  customInputStyle={inputStyles('100%')}
                  isRange={true}
                  labelWidth={'135px'}
                  showMonths={1}
                  isDatePrevent
                />
              </Box>
            </Box>
          )} */}

          <Box
            sx={{
              height: '36px',
              border: '1px solid #000',
              overflow: 'hidden'
            }}
          >
            <Grid container sx={{ height: '100%' }}>
              <Grid
                item
                xs={4}
                sx={{
                  background: theme.colors.alpha.primary[100],
                  boxSizing: 'border-box',
                  height: '100%',
                  borderRight: '1px solid #000'
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Typography variant="h6" className="f-15">
                    File Format
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                  height: '100%'
                }}
              >
                <FormControl fullWidth>
                  <CustomSelectInput
                    IconComponent={CustomSelectIcon}
                    value={formatName}
                    onChange={handleFormatChange}
                    displayEmpty
                    sx={{
                      border: '0px solid',
                      '& .MuiSelect-select': {
                        padding: '6px 14px'
                      }
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          marginTop: '1px',
                          padding: '0',
                          borderRadius: '0px'
                        }
                      },
                      MenuListProps: {
                        style: {
                          padding: '0px',
                          maxHeight: 400, // Set the maximum height of the dropdown
                          overflowY: 'auto' // Enable vertical scrolling
                        }
                      }
                    }}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <Typography color="text.secondary"></Typography>;
                      }
                      return selected;
                    }}
                  >
                    {/* <CustomMenuItem value="CSV">CSV</CustomMenuItem> */}
                    <CustomMenuItem value="Excel">Excel</CustomMenuItem>
                    {/* <CustomMenuItem value="TXT">TXT</CustomMenuItem> */}
                  </CustomSelectInput>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Download;
