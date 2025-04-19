import { format } from 'date-fns';
import moment from 'moment';
import { profilesEnum } from './enums';
// import moment from 'moment-timezone';
import JSEncrypt from 'jsencrypt';
import { errorMessages } from './const';
import { useState } from 'react';

export const countCheckedColumns = (columns) => {
  return Object.values(columns).filter(Boolean).length;
};

export const trimPayloadText = (text, maxLength = 40) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

export const handleCopyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('Payload copied to clipboard');
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
};

export const formatTimestamp = (isoString) => {
  const date = new Date(isoString);

  return date
    .toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
    .replace(',', '')
    .replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2');
};

export const getColorsByPercentage = (percentage) => {
  if (percentage > 90) {
    return {
      background: '#D7FAE0',
      border: '#00AB56',
      text: '#00AB56',
      tooltip: 'Green (> 90%): Healthy'
    };
  } else if (percentage >= 50) {
    return {
      background: '#FFE2C6',
      border: '#FC820A',
      text: '#FFC107',
      tooltip: 'Yellow (50–90%): Warning'
    };
  } else {
    return {
      background: '#FFDBD8',
      border: '#E63D46',
      text: '#E63D46',
      tooltip: 'Red (< 50%): Critical'
    };
  }
};

export const getTodayAndYesterdayTimestamps = () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours

    return {
      today: now.toISOString().slice(0, 19), // Current timestamp (UTC)
      yesterday: yesterday.toISOString().slice(0, 19) // 24 hours ago (UTC)
    };
};
export const getMonthlyTimestamps = () => {
  const to = new Date();
  const from = new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000); // Subtract 24 hours

  return {
    to: to.toISOString().slice(0, 19), // Current timestamp (UTC)
    from: from.toISOString().slice(0, 19) // 24 hours ago (UTC)
  };
};

export const inputStyles = (inputWidth) => ({
  width: inputWidth,
  height: '33px',
  border: `0px solid  #000`,
  borderRadius: '0px',
  paddingLeft: '3px',
  color: '#333'
});

// Utility function to format date columns

const dateColumns = new Set([
  // 'rtcDateTimeIst',
  // 'rtcDateTimeUtc',
  // 'createdDate',
  // 'completedOn',
  // 'firstCommunicationOn',
  // 'createdOn',
  // 'rtcDatetimeUtc',
  // 'lastCommunicatedOn',
  // 'createdDateIst',
  // 'createdDateUtc',
  // 'firstCommunicationOn',
  // 'serverTime',
  // 'rtcDateTime',
  // 'lastUpdateTime',
  '0.0.1.0.0.255',
  ,
]);

const wantIstTime = new Set([
  '0.0.1.0.0.255',
  '1-1.0.9.6.0.255',
  '1-1.0.1.6.0.255'
  // '1-1.0.1.6.0.255',
  // '1-1.0.9.6.0.255'
]);

// export function formatDateColumn(columnId, value) {
//   if (!dateColumns.has(columnId)) return value;

//   const date = moment(value).utc();

//   if (!date.isValid()) return value;

//   if (wantIstTime.has(columnId)) {
//     date.add(11, 'hours').add(0, 'minutes');
//   }

//   return `${date.format('DD-MM-YYYY')} ${date.format('hh:mm:ss A')}`;
// }

export function formatDateColumn(columnId, value) {
  const dateColumns = new Set([
    // 'rtcDateTimeIst',
    // 'rtcDateTimeUtc',
    // 'createdDate',
    // 'completedOn',
    // 'createdOn',
    // 'rtcDatetimeUtc',
    // 'lastCommunicatedOn',
    // 'createdDateIst',
    // 'firstCommunicationOn',
    // 'serverTime',
    // 'rtcDateTime',
    // 'lastUpdateTime',
    // 'yearMonthDay',
    '0.0.1.0.0.255',
    '0.0.0.1.2.255',
    '1-1.0.1.6.0.255',
    '1-1.0.9.6.0.255',
    '2-1.0.1.6.0.255',
    '2-1.0.1.6.1.255',
    '2-1.0.1.6.2.255',
    '2-1.0.1.6.3.255',
    '2-1.0.1.6.4.255',
    '2-1.0.1.6.5.255',
    '2-1.0.1.6.6.255',
    '2-1.0.1.6.7.255',
    '2-1.0.1.6.8.255',
    '2-1.0.9.6.0.255',
    '2-1.0.9.8.1.255',
    '2-1.0.9.8.2.255',
    '2-1.0.9.8.3.255',
    '2-1.0.9.8.4.255',
    '2-1.0.9.8.5.255',
    '2-1.0.9.8.6.255',
    '2-1.0.9.8.7.255',
    '2-1.0.9.8.8.255'
    // 'lastAccess'
  ]);
  const wantIstTime = new Set([
    // 'completedOn',
    // 'lastUpdateTime',
    // 'rtcDateTime',
    // 'serverTime',
    // 'rtcDateTimeUtc',
    // 'createdDateIst',
    '0.0.1.0.0.255',
    '0.0.0.1.2.255',
    '1-1.0.1.6.0.255',
    '1-1.0.9.6.0.255',
    '2-1.0.1.6.0.255',
    '2-1.0.1.6.1.255',
    '2-1.0.1.6.2.255',
    '2-1.0.1.6.3.255',
    '2-1.0.1.6.4.255',
    '2-1.0.1.6.5.255',
    '2-1.0.1.6.6.255',
    '2-1.0.1.6.7.255',
    '2-1.0.1.6.8.255',
    '2-1.0.9.6.0.255',
    '2-1.0.9.8.1.255',
    '2-1.0.9.8.2.255',
    '2-1.0.9.8.3.255',
    '2-1.0.9.8.4.255',
    '2-1.0.9.8.5.255',
    '2-1.0.9.8.6.255',
    '2-1.0.9.8.7.255',
    '2-1.0.9.8.8.255'
    // 'lastAccess'
    // 'createdDateIst',
    // 'createdDateIst'
  ]);
  if (dateColumns.has(columnId)) {
    let date = moment(value);

    if (date.isValid()) {
      if (wantIstTime.has(columnId)) {
        date = date.add(5, 'hours').add(30, 'minutes');
      }
      const formattedDate = date.format('DD-MM-YYYY');
      const formattedTime = date.format('hh:mm:ss a').toUpperCase();
      return `${formattedDate} ${formattedTime}`;
    }
  }
  return value;
}

export const generateUUIDLikeNumber = () => {
  const getRandomHex = () => Math.floor(Math.random() * 16).toString(16);
  const segment1 = Array.from({ length: 8 }, getRandomHex).join('');
  const segment2 = Array.from({ length: 4 }, getRandomHex).join('');
  const segment3 = '4' + Array.from({ length: 3 }, getRandomHex).join(''); // Ensuring the 4th position is '4'
  const segment4 =
    (8 + Math.floor(Math.random() * 4)).toString(16) +
    Array.from({ length: 3 }, getRandomHex).join(''); // Ensuring the first hex of segment 4 is '8', '9', 'A', or 'B'
  const segment5 = Array.from({ length: 12 }, getRandomHex).join('');

  return `${segment1}-${segment2}-${segment3}-${segment4}-${segment5}`;
};

export const isSortable = (columnId) =>
  columnId !== 'metersAction' &&
  columnId !== 'bulkId' &&
  columnId !== 'validationName' &&
  columnId !== 'meterDataAction' &&
  columnId !== 'lastCommunicatedOn' &&
  columnId !== 'rtcDate' &&
  columnId !== 'meterNo' &&
  columnId !== 'createdOn' &&
  columnId !== 'nodeId' &&
  columnId !== 'meterNumber' &&
  columnId !== 'veeManage';

export const bodyCellStyle = {
  height: 40,
  padding: '7px, 7px, 6px, 7px'
};
export const headerCellStyle = {
  height: 80,
  padding: '7px, 7px, 6px, 7px'
};

export const createQueryString = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();

  const buildParams = (obj: any, parentKey: string = '') => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          // If the object is nested, serialize it as JSON and encode
          queryParams.append(newKey, JSON.stringify(value));
        } else {
          queryParams.append(newKey, value);
        }
      }
    });
  };

  buildParams(params);

  return queryParams.toString();
};

// export const initialPrevStartDate  = moment().subtract(1, 'days').startOf('day').toDate();
// export const initialPrevEndDate  = moment().subtract(1, 'days').startOf('day').toDate();

export const getYesterdayStart = () => {
  return moment().subtract(1, 'days').startOf('day').toDate();
};

export const getYesterdayEnd = () => {
  return moment().subtract(1, 'days').endOf('day').toDate();
};

export const currentDate = new Date();
export const currentDay = moment().startOf('day').format('YYYY-MM-DD');
// export const startWeekday = moment()
//   .subtract(6, 'days')
//   .startOf('day')
//   .format('YYYY-MM-DD'); // Date 7 days ago
export const startWeekday = moment()
  .subtract(6, 'days')
  .startOf('day')
  .format('YYYY-MM-DD'); // Date 7 days ago

export const startWeekdays = moment()
  .subtract(4, 'days')
  .startOf('day')
  .format('YYYY-MM-DD'); // Date 7 days ago

export const initialStartDate = moment()
  // .subtract(1, 'days')
  .startOf('day')
  .toDate(); // Yesterday's start of the day
export const initialEndDate = moment().startOf('day').toDate(); // Today's start of the day

export function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // Pad the remaining seconds with a leading zero if less than 10
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  // Format minutes with commas for thousands separators
  const formattedMinutes = minutes.toLocaleString('en-IN');

  return `${formattedMinutes} Minutes`;
  // Uncomment the line below if you want to include seconds in the output
  // return `${formattedMinutes}m:${formattedSeconds}s`;
}

export function secondsToMint(seconds) {
  if (Math.abs(seconds) < 60) return '0';

  const minutes = Math.floor(Math.abs(seconds) / 60);
  const formattedMinutes = (seconds < 0 ? -minutes : minutes).toLocaleString(
    'en-IN'
  );

  return `${formattedMinutes}`;
}

export const todayDate = moment().format('YYYY-MM-DD');
export const yesterdayDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

export const clearPaginationHistory = () => {
  localStorage.removeItem('paginationHistory');
};

export const updateLocalStorage = (newPaginationState) => {
  let paginationHistory =
    JSON.parse(localStorage.getItem('paginationHistory')) || [];
  paginationHistory.push(newPaginationState);
  setLocalStorage('paginationHistory', paginationHistory);
};
export const statusCode = {
  success: 200,
  Bad: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  server: 500
};

export const deepEqual = (a, b) => {
  if (a === b) return true;

  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (const key in a) {
    if (!b.hasOwnProperty(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
};
export const isDeepEqual = (a, b) => {
  if (a === b) return true; // Check if both are strictly equal

  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false; // If they are not objects or are null, they're not equal
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false; // Different number of keys

  for (const key of keysA) {
    if (!b.hasOwnProperty(key)) return false; // Key mismatch
    if (!deepEqual(a[key], b[key])) return false; // Recursive comparison for nested objects
  }

  return true; // All keys and values match
};

export function splitRange(range) {
  const [min, max] = range.split(' to ').map(Number);
  return { min, max };
}
export function findRange(range) {
  const [minX, maxX] = range.split(' to ').map(Number);
  return { minX, maxX };
}

export function splitNumber(range) {
  const [min, max] = range.split(' - ').map(Number);
  return { min, max };
}

export const extractIntegers = (inputString) => {
  // Regular expression to find all integers in the string
  const regex = /\d+/;
  // Extract the first match and convert it to an integer
  const match = inputString.match(regex);
  return match ? Number(match[0]) : null; // Return null if no integer is found
};

export function parseStringToArray(inputString) {
  // Split the input string by " or " to get the pairs
  const pairs = inputString.split(' & ');

  // Map over each pair to create the desired objects
  return pairs.map((pair) => {
    const [name, value] = pair.split(' for ');
    return {
      name: value.trim(),
      value: name.trim()
    };
  });
}

export function convertStringToObjects(str) {
  // Split the string by '&' to handle each pair separately
  const pairs = str.split('&').map((item) => item.trim());

  // Convert each pair into an object with 'value' and 'name'
  return pairs.map((pair) => {
    // Split the pair by 'for' to separate the value and the name
    const [value, name] = pair.split('for').map((item) => item.trim());

    // Return the object with 'value' as a number and 'name' as a string
    return {
      value: Number(value),
      name: name
    };
  });
}

export const getMonthStartAndEnd = (dateString) => {
  // Parse the date string using moment
  const date = moment(new Date(dateString));

  // Get the start of the month
  const startOfMonth = date.startOf('month').format('YYYY-MM-DD');

  // Get the end of the month
  const endOfMonth = date.endOf('month').format('YYYY-MM-DD');

  return {
    startOfMonth,
    endOfMonth
  };
};

export const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`
});

export const isAuth = () => {
  return true;
  // return !!localStorage.getItem('isAuthenticated');
};

export const setLocalStorage = (storageKey, data) => {
  if (!storageKey) {
    console.error('Storage key is required');
    return;
  }
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(storageKey, jsonData);
  } catch (error) {
    console.error('Failed to set localStorage:', error);
  }
};

export const getLocalStorage = (storageKey) => {
  // Validate storageKey
  if (!storageKey || typeof storageKey !== 'string') {
    console.error('Storage key is required and must be a string');
    return null;
  }

  // Check for browser environment
  if (typeof window === 'undefined' || !window.localStorage) {
    console.error('localStorage is not available in this environment');
    return null;
  }

  try {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem(storageKey);

    // Return null if no data is found
    if (storedData === null) {
      return null;
    }

    // Attempt to parse the data as JSON
    return JSON.parse(storedData);
  } catch (error) {
    console.error('Failed to get or parse localStorage:', error);
    return null;
  }
};

// export const setLocalStorage = (storageKey, data) => {
//   try {
//     localStorage.setItem(storageKey, JSON.stringify(data));
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getLocalStorage = (storageKey) => {
//   try {
//     if (typeof window !== 'undefined') {
//       return JSON.parse(localStorage?.getItem(storageKey));
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

export const clearLocalStorage = () => {
  if (typeof window === 'undefined') {
    console.error('LocalStorage is not accessible in this environment.');
    return;
  }
  try {
    localStorage.clear();
    console.log('LocalStorage cleared successfully.');
  } catch (error) {
    console.error('Failed to clear LocalStorage:', error);
  }
};

// export const clearLocalStorage = () => {
//   try {
//     if (typeof window !== 'undefined') {
//       return localStorage.clear();
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

export const removeItemLocalStorage = (storageKey) => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.removeItem(storageKey);
    }
  } catch (e) {
    console.log(e);
  }
};

export function includesD1(str) {
  return str.includes('D1');
}
export function includesD2(str) {
  return str.includes('D2');
}
export function includesD3(str) {
  return str.includes('D3');
}

export function includesD2orD3(str, value1, value2) {
  return str.includes(value1) || str.includes(value2);
}

// export function extractRanges(input) {
//   // Use a regular expression to match the number ranges in the format "number - number"
//   const ranges = input.match(/\d+ - \d+/g);

//   if (ranges) {
//     return ranges.map((range) => {
//       const [start, end] = range.split(' - ').map(Number);
//       return { start, end };
//     });
//   }

//   return [];
// }

export function extractRanges(input) {
  // Use a regular expression to match the number ranges in the format "number - number" or "number to number"
  const rangeRegex = /(\d+)\s*(?:-|to)\s*(\d+)/g;
  const matches = input.matchAll(rangeRegex);

  const result = [];
  for (const match of matches) {
    const start = parseInt(match[1], 10);
    const end = parseInt(match[2], 10);
    result.push({ start, end });
  }

  return result;
}

export const extractNumbers = (str) => {
  // Use a regular expression to find all the numbers in the string
  const numbers = str.match(/\d+/g);

  // Convert the matched numbers to integers
  if (numbers && numbers.length >= 2) {
    return [parseInt(numbers[0]), parseInt(numbers[1])];
  }

  // Return default values if no numbers are found
  return [0, 0];
};

export const parseRangeString = (inputString) => {
  try {
    const parsedObject = JSON.parse(inputString);
    const fromValue = parseInt(parsedObject.From, 10);
    const toValue = parseInt(parsedObject.To, 10);

    if (!isNaN(fromValue) && !isNaN(toValue)) {
      return [fromValue, toValue];
    } else {
      console.error('Invalid "From" or "To" values');
      return [0, 0];
    }
  } catch (error) {
    console.error('Error parsing input string:', error);
    return [0, 0];
  }
};

export const checkStartDate = (startDate, formData) => {
  if (startDate) {
    return startDate; // If startDate exists, return it.
  }
  return formData; // Otherwise, return formData.
};

export const validateUrl = (url: string): boolean => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      "((([a-zA-Z0-9$_.+!*'(),;?&=-]+\\.[a-zA-Z0-9$_.+!*'(),;?&=-]+)+)|" + // domain name
      'localhost|' + // OR localhost
      '(\\d{1,3}\\.){3}\\d{1,3})' + // OR IPv4
      '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + // port and path
      '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
      '(\\#[-a-zA-Z0-9_]*)?$',
    'i'
  );
  return !!urlPattern.test(url);
};
export const convertTime = (utcTime) => {
  // Parse the time with 12-hour format and AM/PM
  const utcMoment = moment.utc(utcTime, 'DD/MM/YYYY hh:mm:ss A');
  // Set the offset for IST (UTC+05:30)
  const istMoment = utcMoment.utcOffset('+05:30');
  // Format and return the time in DD/MM/YYYY HH:mm:ss format
  return istMoment.format('DD/MM/YYYY hh:mm:ss A');
};

export const getDateAndTime = (value) => {
  const date = new Date(value);

  // Format date as YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0];

  // Format time as HH:MM:SS
  const formattedTime = date.toTimeString().split(' ')[0];

  return `${formattedDate} ${formattedTime}`;
};

export const useRowSelection = () => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleRowSelection = (rowId: number) => {
    setSelectedRows((prevSelected) => {
      const newSelection = new Set(prevSelected);
      if (newSelection.has(rowId)) {
        newSelection.delete(rowId);
      } else {
        newSelection.add(rowId);
      }
      return newSelection;
    });
  };

  const handleSelectAll = (rows: { id: number }[]) => {
    setSelectedRows((prevSelected) => {
      const newSelection = new Set(prevSelected);
      if (newSelection.size === rows.length) {
        return new Set(); // Deselect all
      } else {
        return new Set(rows.map((row) => row.id)); // Select all rows by ID
      }
    });
  };

  const clearSelection = () => {
    setSelectedRows(new Set()); // Reset selection
  };

  return { selectedRows, handleRowSelection, handleSelectAll, clearSelection };
};

export const isPayloadColumn = (columnId) => columnId === 'meterNo';
export const isPayloadColumnId = (columnId) => columnId === 'nodeId';

export const groupColumnsById = (columns) => {
  const filteredColumns = [];
  const otherColumns = [];

  columns.forEach((column) => {
    if (column.id.includes('0') || column.id.includes('1')) {
      filteredColumns.push(column);
    } else {
      otherColumns.push(column);
    }
  });

  // Combine all the columns that contain '0' or '1' into one group
  const groupedColumns = [
    {
      id: 'groupedColumns',
      label: 'Grouped Columns',
      align: 'left',
      width: filteredColumns.reduce((acc, col) => acc + col.width, 0) // Sum up the widths of grouped columns
    }
  ];

  // Return the total count of unique groups (grouped and ungrouped columns)
  return [...groupedColumns, ...otherColumns].length;
};

export const convertTimeFormat = (rows) => {
  return rows.map((row) => ({
    Time: new Date(row.Time).toTimeString().split(' ')[0],
    Id: row.Id
  }));
};

export function formatTime(seconds) {
  // Case 1: If seconds are less than 60 (both positive and negative), return "0 Days 00:00"
  if (Math.abs(seconds) < 60) return '0 Days 00:00';

  // Use absolute value for calculations
  const absSeconds = Math.abs(seconds);

  const days = Math.floor(absSeconds / (24 * 60 * 60));
  const hours = Math.floor((absSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((absSeconds % (60 * 60)) / 60);

  // Format hours and minutes to two digits
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  // Determine if the result should be negative based on the input
  const sign = seconds < 0 && days > 0 ? '-' : '';

  return `${sign}${days} Days ${formattedHours}:${formattedMinutes}`;
}

export function sortSorceEndpointOptions(list) {
  return [...list].sort((a, b) => parseInt(a.options) - parseInt(b.options));
}

export function sortHopeCountOptions(list) {
  return [...list].sort((a, b) => parseInt(a.options) - parseInt(b.options));
}

export const mapTransformedToRows = (transformedData, rowsData) => {
  return rowsData.map((row) => {
    const result = {};

    transformedData.forEach((transformedItem) => {
      const { id, obisCode } = transformedItem;

      if (row[id] !== undefined) {
        result[id] = row[id];
      } else if (obisCode && row.entityModels) {
        const matchingEntity = row.entityModels.find(
          (entity) => entity.obisCode === obisCode
        );
        result[id] = matchingEntity ? matchingEntity.obisValue : null;
      } else {
        result[id] = null;
      }
    });

    return result;
  });
};

export const createHeaders = (dataList, activeProfile) => {
  const result = [];
  dataList.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key === 'obisData') return;
      if (
        key === 'eventLogList' &&
        activeProfile != profilesEnum?.ESWPUSHDATA
      ) {
        return;
      }
      if (
        key === 'rtcDateTimeIst' &&
        (activeProfile === profilesEnum?.BLOCKLOADPROFILE ||
          activeProfile === profilesEnum?.DAILYLOADPROFILE ||
          activeProfile === profilesEnum?.ESWPUSHDATA ||
          activeProfile === profilesEnum?.INSTANTPROFILE ||
          activeProfile === profilesEnum?.BILLINGPROFILE)
      ) {
        return;
      }
      if (key === 'eventName' && activeProfile != profilesEnum?.EVENTLOG) {
        return;
      }
      if (key === 'entityModels') {
        item[key].map((item, value) => {
          result.push({
            id: item.obisCode,
            label: item.entityName,
            align: 'left',
            width: 250,
            obisCode: item.obisCode
          });
        });
      } else {
        let label;
        let width = 220; // Default width
        let obsVal = '';

        // Check for specific key values and set the label accordingly
        if (key === 'rtcDateTimeIst') {
          label = 'Real-Time Clock (Date and Time)';
          obsVal = '0.0.1.0.0.255';
        } else if (key === 'createdDateIst') {
          label = 'Created Date Time';
        } else {
          // Default case, format the label for other keys
          label = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
        }

        // Check if the key is 'eventLogList' to set a different width
        if (key === 'eventLogList') {
          width = 300;
        }

        result.push({
          id: key,
          label: label, // Use the label set based on the conditions
          align: 'left',
          width: width, // Use the width based on the conditions
          obisCode: obsVal
        });
      }
    });
  });

  return result;
};

export function encryptMessage(message, publicKey) {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);

  return jsEncrypt.encrypt(message);
}

export const getMinTime = (startDate) => {
  if (startDate) {
    const minTime = new Date(startDate);
    minTime.setSeconds(0, 0);
    return minTime;
  }
  return null;
};

export const getDateDifference = (start: string, end: string): number => {
  const startMoment = moment(start, 'YYYY-MM-DD');
  const endMoment = moment(end, 'YYYY-MM-DD');
  return endMoment.diff(startMoment, 'days');
};

export const maxDays = 30;

export const getTimeRange = () => {
  const currentTime = moment();
  const fromTime = currentTime
    .clone()
    .subtract(6, 'hours')
    .format('YYYY-MM-DDTHH:mm:ss');
  const toTime = currentTime.format('YYYY-MM-DDTHH:mm:ss');

  return {
    from: fromTime,
    to: toTime
  };
};

export const createStripedPattern = (baseColor, stripeColor) => {
  const patternCanvas = document.createElement('canvas');
  const patternContext = patternCanvas.getContext('2d');
  const size = 30;

  patternCanvas.width = size;
  patternCanvas.height = size;

  if (patternContext) {
    patternContext.fillStyle = baseColor; // Base color
    patternContext.fillRect(0, 0, size, size);

    patternContext.strokeStyle = stripeColor; // Stripe color
    patternContext.lineWidth = 1.5;

    patternContext.beginPath();
    patternContext.moveTo(size, 0);
    patternContext.lineTo(0, size);
    patternContext.moveTo(size / 2, 0);
    patternContext.lineTo(0, size / 2);
    patternContext.moveTo(size, size / 2);
    patternContext.lineTo(size / 2, size);
    patternContext.stroke();
  }

  return patternCanvas;
};

export function convertUTCtoIST(utcTime) {
  if (!utcTime) {
    return ' '; // Return empty string if no utcTime is provided
  }

  const istTime = moment.utc(utcTime).utcOffset(330); // IST is UTC+5:30
  return istTime.format('hh:mm A');
}

export const getIngightsData = (res) => {
  return res?.map((item) => parseInt(item.value)); // Convert value to number
};

export const getData = (res) => {
  return res?.map((item) => parseInt(item.value)); // Convert value to number
};

// export const getTimeFormatFunc = (inputTime, fromFormat, toFormat) => {
//   // Define UTC offsets for different time zones
//   const timeZoneOffsets = {
//     IST: '+05:30',
//     UTC: '+00:00'
//   };

//   // Input validation
//   if (!inputTime) {
//     throw new Error("Input time is required");
//   }

//   if (!timeZoneOffsets[fromFormat] || !timeZoneOffsets[toFormat]) {
//     throw new Error("Invalid format. Supported formats: IST, UTC");
//   }

//   try {
//     // Parse the input time considering the source timezone
//     const parsedTime = moment(inputTime).utcOffset(timeZoneOffsets[fromFormat]);

//     // Check if time is valid
//     if (!parsedTime.isValid()) {
//       throw new Error("Invalid input time format");
//     }

//     // Convert to target timezone
//     const convertedTime = parsedTime.clone().utcOffset(timeZoneOffsets[toFormat]);

//     return {
//       dateWithMilliseconds: convertedTime.format("YYYY-MM-DD HH:mm:ss"),
//       timeWithAmPm: convertedTime.format('hh:mm A'),
//       // Including additional useful formats
//       isoString: convertedTime.toISOString(),
//       timestamp: convertedTime.unix(),
//       // Adding formatted date
//       fullDateTime: convertedTime.format('MMMM Do YYYY, h:mm:ss a')
//     };
//   } catch (error) {
//     throw new Error(`Time conversion failed: ${error.message}`);
//   }
// };

export const getTimeFormatFunc = (inputTime, fromFormat, toFormat) => {
  // Define UTC offsets for different time zones
  const timeZoneOffsets = {
    IST: '+05:30',
    UTC: '+00:00'
  };

  // Input validation
  if (!inputTime) {
    throw new Error('Input time is required');
  }

  if (!timeZoneOffsets[fromFormat] || !timeZoneOffsets[toFormat]) {
    throw new Error('Invalid format. Supported formats: IST, UTC');
  }

  try {
    // Parse ISO string and set the source timezone
    let parsedTime;
    if (moment(inputTime, moment.ISO_8601, true).isValid()) {
      // Handle ISO format
      parsedTime = moment(inputTime).utcOffset(
        timeZoneOffsets[fromFormat],
        true
      );
    } else {
      // Handle other formats
      parsedTime = moment(inputTime).utcOffset(timeZoneOffsets[fromFormat]);
    }

    // Check if time is valid
    if (!parsedTime.isValid()) {
      throw new Error('Invalid input time format');
    }

    // Convert to target timezone
    const convertedTime = parsedTime
      .clone()
      .utcOffset(timeZoneOffsets[toFormat]);

    return {
      dateWithMilliseconds: convertedTime.format('YYYY-MM-DD HH:mm:ss'),
      timeWithAmPm: convertedTime.format('hh:mm A'),
      isoString: convertedTime.toISOString(),
      timestamp: convertedTime.unix(),
      fullDateTime: convertedTime.format('MMMM Do YYYY, h:mm:ss a'),
      // Adding zone information for debugging
      zone: convertedTime.format('Z')
    };
  } catch (error) {
    throw new Error(`Time conversion failed: ${error.message}`);
  }
};

export const getErrorMessage = (errorCode) => {
  return errorMessages[errorCode] || 'Error code not found';
};

export const createPieChartIcon = (count, online, offline, zoom) => {
  const total = online + offline;
  const onlinePercentage = (online / total) * 100;
  const offlinePercentage = (offline / total) * 100;

  // Size based on zoom level
  let size = 90;
  if (zoom >= 8) size = 70;
  if (zoom > 10) size = 55;

  const padding = 4;
  const svgSize = size + padding * 2;

  const radius = size / 2 - 2;
  const center = svgSize / 2;

  let fontSize = size / 4;
  if (zoom > 10) fontSize = size / 4.5;

  let svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
      <defs>
        <!-- Text shadow effect -->
        <filter id="textShadow" x="-10%" y="-10%" width="140%" height="140%">
          <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="0.5" result="blurred" />
          <feFlood flood-color="white" result="glowColor" />
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
  `;

  // Add the background circle with thicker border
  svgContent += `<circle cx="${center}" cy="${center}" r="${
    radius + 2
  }" fill="#B7EFC3" stroke="#B7EFC3" stroke-width="2"/>`;

  // If only one type (all online or all offline)
  if (online === 0) {
    svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#FF5F61"/>`;
  } else if (offline === 0) {
    svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#2DC26D"/>`;
  } else {
    // Calculate angles for the pie slices
    const offlineAngle = (offlinePercentage / 100) * 360;
    const offlineRadians = (offlinePercentage / 100) * (2 * Math.PI);

    // Add the base green circle (online)
    svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#2DC26D"/>`;

    // Add the red slice (offline) as a path
    if (offlinePercentage > 0 && offlinePercentage < 100) {
      const startAngle = 0;
      const endAngle = offlineRadians;

      // Calculate path coordinates
      const x1 = center + radius * Math.sin(startAngle);
      const y1 = center - radius * Math.cos(startAngle);
      const x2 = center + radius * Math.sin(endAngle);
      const y2 = center - radius * Math.cos(endAngle);

      const largeArcFlag = offlinePercentage > 50 ? 1 : 0;

      svgContent += `
        <path d="M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z" 
        fill="#FF5F61"/>
      `;

      // Add divider lines
      // First line (from center to top)
      svgContent += `<line x1="${center}" y1="${center}" x2="${x1}" y2="${y1}" stroke="#B7EFC3" stroke-width="2"/>`;

      // Second line (from center to angle)
      svgContent += `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" stroke="#B7EFC3" stroke-width="2"/>`;
    }
  }

  // Add count text with shadow effect
  svgContent += `
    <text x="${center}" y="${center}" text-anchor="middle" dy=".3em" 
      font-size="${fontSize}px" font-weight="bold" font-family="Arial" filter="url(#textShadow)" fill="black">
      ${count.toLocaleString()}
    </text>
  </svg>`;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgContent)}`,
    scaledSize: new google.maps.Size(svgSize, svgSize),
    anchor: new google.maps.Point(center, center)
  };
};
