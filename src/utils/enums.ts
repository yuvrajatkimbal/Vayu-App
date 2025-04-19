export const filtersTypeEnum = {
  METERS: 1,
  HESCOMMANDS: 2,
  HESRAWDATA: 3,
  VEEEXPRESSION: 4,
  METERSLIST: 5,
  EVENTS: 6,
  METERCOMMANDLOGS: 7,
  METERROUTING: 8,
  ROUTING: 9,
  SETTINGS: 10,
  RTCDETAIL: 11,
  NONCOMMUNICATEDREPORTS: 12,
  BULKCOMMAND: 13,
  NODES: 14,
  TOPOLOGY: 15,
  GATEWAY: 16,
  MAPS: 17
};
export const commandsEnum = {
  DISCONNECT: 1,
  CONNECT: 2,
  IP: 3,
  BLOCKLOADPROFILE: 4,
  DAILYLOADPROFILE: 5,
  BILLINGPROFILE: 6
};

export const profilesEnum = {
  ESWPUSHDATA: 'ESWPUSHDATA',
  INSTANTPROFILE: 'INSTANTPROFILE',
  BILLINGPROFILE: 'BILLINGPROFILE',
  DAILYLOADPROFILE: 'DAILYLOADPROFILE',
  BLOCKLOADPROFILE: 'BLOCKLOADPROFILE',
  EVENTLOG: 'EVENTLOG',
  RAWDATA: 'RAWDATA'
};

export const profilesTitleEnum = {
  INSTANTPROFILE: 'IP',
  BILLINGPROFILE: 'BP',
  DAILYLOADPROFILE: 'DP',
  BLOCKLOADPROFILE: 'BLP',
  ESWPUSHDATA: 'ESW',
  EVENTLOG: 'Events',
  RAWDATA: 'Raw Data'
};

export const meterTypeEnum = {
  PUSH: 'PUSH',
  PULL: 'PULL'
};

export const settingsEnum = {
  METERSETTINGS: 'meterSettings',
  COMMANDSETTINGS: 'commandSettings'
};

export const latestIPEnum = {
  LATESTIP: 1,
  ALL: 2
};

export const materTypesEnum = {
  D1: "Single Phase",
  D2: "Three Phase",
  D3: "HT/LT CT"
};
export const materCategoryEnum = {
  D1: 6,
  D2: 7,
  D3: 8
};

export const meterActionsEnum = {
  RUNCOMMANDS: "runCommands",
  COMMANDLOGS: "commandLogs",
  METERDATA: "meterData",
  ROUTINGS: "routings",
};

export const tablesEnum = {
  COMMANDLOGS: "ehescommand",
  BULKCOMMANDS: "ehesbulkcommand",
  ROUTINGS: "meterrouting",
  METERROUTING: "meterlatestrouting",
  MATERS: "nameplate",
  RTCDETAIL: "rtcdetail",
  RTCHISTORICAL: "historicalrtcdetail",
  VEE: "veeexpression",
  BILLINGPROFILE: "billingprofile",
  BLOCKLOADPROFILE: "blockloadprofile",
  DAILYLOADPROFILE: "dailyloadprofile",
  ESWPUSHDATA: "eswprofile",
  EVENTLOG: "eventsprofile",
  INSTANTPROFILE: "instantaneousprofile",
  SLABILLINGPROFILE: 'billingslareport',
  SLABLOCKLOADPROFILE: 'blockloadslareport',
  SLADAILYLOADPROFILE: 'dailyloadslareport',
  NONCOMMUNICATING: 'meterlatestrouting',
  RAWDATA: 'rawData'
};

export const requestedForEnum = {
  COMMANDLOGS: "Command Hub",
  RAWDATA: "Raw Data",
  BULKCOMMANDS: "Bulk Command",
  ROUTINGS: "Meter Historical Routing",
  NONCOMMUNICATING: "Meter Latest Routing",
  MATERS: "Meters",
  BILLINGPROFILE: "Billing Profile",
  BLOCKLOADPROFILE: "Block Load Profile",
  DAILYLOADPROFILE: "Daily Profile",
  ESWPUSHDATA: "ESW Profile",
  EVENTLOG: "Events Profile",
  VEE: "VEE Expression",
  INSTANTPROFILE: "Instant Profile",
  RTCDETAIL: "RTC Detail",
  RTCHISTORICAL: "Historical RTC Detail",
  SLABILLINGPROFILE: 'Billing SLA Report',
  SLABLOCKLOADPROFILE: 'Block Load SLA Report',
  SLADAILYLOADPROFILE: 'Daily Load SLA Report',
};

export const commandGroupEnum = {
  TEXTBOX: 'textbox',
  EMPTYBOX: 'emptybox',
  INPUTLENGTH: 'inputlength',
  INPUTLENGTH128: 'textbox128bit',
  INPUTINT: 'inputint',
  DROPDOWN: 'dropdown',
  DATETIME: 'datetime',
  DATEPICKER: 'datepicker',
  DATERANGE: 'daterange',
  DATETIMEOREMPTY: 'datetimeorempty',
  DATERANGEOREMPTY: 'daterangeorempty',
  DATE: 'date',
  SELECTBOX: 'selectbox',
  SELECTBOXRANGE: 'selectboxrange',
  D1D2D3: 'd1d2d3',
  URLANDKEY: 'urlandkey',
  STRINGNOLENTH: 'stringnolength',
  DECIMAL: 'decimal',
  DATERNAGEORNUMBER: 'dateornumberrange',
  NUMBERRANGE: 'numberrange',
  DATEPICKERORDATERANGE: 'datepickerordaterange',
  TEXTBOXNUMBERRANGE: 'textboxnumberrange',
  NUMBERVALUE: 'numbervalue',
};

export const commandNameEnum = {
  ConnectDisconnect: 1,
  SetLoadLimit: 2,
  GetInstantProfile: 3,
  GetBlockLoadProfile: 4,
  GetDailyLoadProfile: 5,
  GetBillingProfile: 6,
  FirmwareUpgrade: 7,
  SetRTC: 8,
  SetDemandIntegrationPeriod: 9,
  SetProfileCapturePeriod: 10,
  SetSingleActionSchedule: 11,
  SetActivityCalendarName: 12,
  SetCalendarTOD: 13,
  SetCalendarActivationDate: 14,
  SetLLSSecretMRChange: 15,
  SetHLSKeyUSChange: 16,
  SetHLSKeyFWChange: 17,
  SetGlobalKeyChange: 18,
  SetESWFChange: 19,
  SetMDReset: 20,
  GRBlockLoadProfile: 21,
  SetLockoutPeriod: 22,
  SetInstantCapturePeriod: 23,
  GetNamePlate: 24,
  GetSingleActionSchedule: 25,
  GetDemandIntegrationPeriod: 26,
  GetRelayStatus: 27,
  GetLoadLimit: 28,
  GetProfileCapturePeriod: 29,
  GetControlEvent: 30,
  GetCurrentEvent: 31,
  GetNonRolloverEvent: 32,
  GetPowerEvent: 33,
  GetTransactionEvent: 34,
  GetVoltageEvent: 35,
  GetInstantCapturePeriod: 36,
  GetActivityCalendarName: 37,
  GetCalendarTOD: 38,
  GetCurrentLimit: 39,
  SetCurrentLimit: 40,
  GetVoltageEventProfile: 41,
  GetCurrentEventProfile: 42,
  GetPowerEventProfile: 43,
  GetTransactionEventProfile: 44,
  GetOtherEventProfile: 45,
  GetNonRollOverEventProfile: 46,
  GetControlEventProfile: 47,
  GetRTC: 48,
  GetDiagnosticData: 49,
  GetStoredIPData: 50,
  GetNetMeteringMode: 51,
  SetNetMeteringMode: 52,
  GetPaymentMode: 53,
  SetPaymentMode: 54,
  GetPrepaidBalance: 55,
  SetPrepaidBalance: 56,
  GetClockStatus: 57,
  SetLastRechargeAmount: 58,
  SetLastRechargeTime: 59,
  SetTotalAmountAtLastRecharge: 60,
  SetCurrentBalanceTime: 61,
  GetLastRechargeAmount: 62,
  GetLastRechargeTime: 63,
  GetTotalAmountAtLastRecharge: 64,
  GetCurrentBalanceTime: 65,
  GetESWF: 66,
  GetCalendarActivationDate: 67,
  PingMeter: 68,
  ActivateCalendar: 69,
  GetAllPrepaidParameters: 70,
  GetProfileTotalEntries: 71,
  GetBlockLoadProfileInternal: 72,
  NicConfig: 73,
  GetLoadLimitEmergency: 74,
  SetLoadLimitEmergency: 75,
  SetRelayBit: 76,
  DisableRelayOperation: 77,
  SetLoadCurtailmentIntervalTime: 78,
  SetLoadCurtailmentReconnectionAttempts: 79,
  GetLockoutPeriod: 80,
  GetLoadCurtailmentIntervalTime: 81,
  GetLoadCurtailmentReconnectionAttempts: 82,
  GetDIData: 83,
  SyncRTC: 84,
  GetInternalFWVersion: 85,
  GetTamperOccurrenceInterval: 86,
  SetTamperOccurrenceInterval: 87,
  GetTamperRestorationInterval: 88,
  SetTamperRestorationInterval: 89
};

