import { LessThen } from "../assets/svg/svg";

export const filterType = {
  MeterCategory: "Meter Category",
  Manufacturer: "Manufacturer",
  RfVersion: "RF Version",
  YearOfManufacture: "Manufacturing Year",
  // FirmwareVersion: 'Firmware Version',
  CommunicationType: "Communication Type",
  MeterConnectionStatus: "Meter Connection Status"
};

export const projects = {
  NMS: "NMS",
  HES: "HES"
};

export const meterProfileList = [
  {
    name: "Instantaneous Profile",
    value: "INSTANTPROFILE"
  },
  {
    name: "Block Load Profile",
    value: "BLOCKLOADPROFILE"
  },
  {
    name: "Billing Profile",
    value: "BILLINGPROFILE"
  },
  {
    name: "Daily Profile",
    value: "DAILYLOADPROFILE"
  },
  {
    name: "Events",
    value: "EVENTLOG"
  },
  {
    name: "Event Status Word",
    value: "ESWPUSHDATA"
  },
  {
    name: "Raw Data",
    value: "RAWDATA"
  }
];

export const dropdownOptions = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" }
];
export const options = [
  { label: "1 minute", value: 1, icon: LessThen },
  { label: "3 minutes", value: 2, icon: LessThen },
  { label: "7 minutes", value: 3, icon: LessThen },
  { label: "1 hour", value: 4, icon: LessThen },
  { label: "1 day", value: 5, icon: LessThen },
  { label: "More than 1 day", value: 6 }
];
export const optionsCommandValue = [
  { label: "Connect", value: 1 },
  { label: "Disconnect", value: 2 },
  { label: "All", value: null }
];

export const tabsEnum = {
  BILLINGPROFILE: "BILLINGPROFILE",
  BLOCKLOADPROFILE: "BLOCKLOADPROFILE",
  DAILYLOADPROFILE: "DAILYLOADPROFILE",
  GATEWAYLOAD: "GATEWAYLOAD",
  NONCOMMUNICATING: "NONCOMMUNICATING",
  SLADETAILED: "SLADETAILED",
  SLASUMMARY: "SLASUMMARY"
};

export const nodeSearchEnum = {
  NODEID: "In Node ID",
  GATEWAYID: "In Gateway ID"
};

export const reportsType = [
  { title: "SLA - Summary RC DC", highlighted: false, value: "SLASUMMARY" },
  { title: "SLA - Detailed RC DC", highlighted: false, value: "SLADETAILED" },
  {
    title: "SLA - Block Load Profile",
    highlighted: true,
    value: "BLOCKLOADPROFILE"
  },
  {
    title: "SLA - Daily Profile",
    highlighted: false,
    value: "DAILYLOADPROFILE"
  },
  {
    title: "SLA - Billing Profile",
    highlighted: false,
    value: "BILLINGPROFILE"
  },
  // { title: 'Events Report', highlighted: false, value: '' },
  { title: "Gateway Load", highlighted: false, value: "GATEWAYLOAD" },
  { title: "Non Communicating", highlighted: false, value: "NONCOMMUNICATING" }
];

export const eventNames = [
  "Current Profile",
  "Other Profile",
  "Power Profile",
  "RC/DC Profile",
  "Voltage Profile",
  "Non-Rollover Profile",
  "Transaction Profile"
];

export const roleNames = ["User", "Super User", "Admin", "Super Admin"];

export const eventsList = [
  "CURRENTPROFILE",
  "OTHERPROFILE",
  "POWERPROFILE",
  "CONNECTDISCONNECTPROFILE",
  "VOLTAGEPROFILE",
  "NONROLLOVERPROFILE",
  "TRANSACTIONPROFILE"
];

export const errorMessages = {
  "VAANI-EXCEPTION-001": "Internal Server Error",
  "VAANI-EXCEPTION-002": "Unauthorized user",
  "VAANI-NMS-API-001": "From Date Not Found",
  "VAANI-NMS-API-002": "To Date Not Found",
  "VAANI-NMS-API-003": "Search String Invalid",
  "VAANI-NMS-API-004": "Filter is Invalid",
  "VAANI-NMS-API-005": "From Date is Invalid",
  "VAANI-NMS-API-006": "To Date is Invalid",
  "VAANI-NMS-API-007": "Page Number is Invalid",
  "VAANI-NMS-API-008": "Page Size is Invalid",
  "VAANI-NMS-API-015": "Page Number is Empty",
  "VAANI-NMS-API-016": "Page Size is Empty",
  "VAANI-NMS-API-009":
    "Difference between the search time should be appropriate",
  "VAANI-NMS-API-010":
    "ENMS-Data layer Uptime trend Service Giving issue for Uptime trends",
  "VAANI-NMS-API-011": "ENMS-Data layer Giving issue for Gateway Summary",
  "VAANI-NMS-API-012":
    "ENMS-Data layer Nodes Tile Summary Service Giving issue",
  "VAANI-NMS-API-013":
    "ENMS-Data layer Gateway Insights Summary Service Giving issue",
  "VAANI-NMS-API-014":
    "ENMS-Data layer Nodes Insights Summary Service Giving issue",
  "VAANI_NMS_API-017": "ENMS-Data layer Nodes List Summary Service Giving issue"
};
