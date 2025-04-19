import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  metersList: [],
  meterDetail: {},
  meterProfilesDetail: {},
  meterEvents: [],
  downloadList: [],
  meterTypeList: [],
  meterConnectionList: [],
  getMeterDropdownDetailList : [],
  entitiesList : [],
  meterRoutingsList : [],
  commandCategoryList : [],
  commandByCategoryList : [],
  meterCommandsList : [],
  meterAllCommandsList : [],
  meterProfileDataList : []
};

const metersSlice = createSlice({
  name: 'metersViewer',
  initialState,
  reducers: {
    setAllMetersList: (state, action) => {
      state.metersList = action.payload;
    },
    getMeterDropdownDetail: (state, action) => {
      state.getMeterDropdownDetailList = action.payload;
    },
    setMeterDetails: (state, action) => {
      state.meterDetail = action.payload;
    },
    setMeterProfilesDetail: (state, action) => {
      state.meterProfilesDetail = action.payload;
    },
    setMeterEventDetails: (state, action) => {
      state.meterEvents = action.payload;
    },
    setDownloadDetails: (state, action) => {
      state.downloadList = action.payload;
    },
    setMeterEntities: (state, action) => {
      state.entitiesList = action.payload;
    },
    setMeterRoutings: (state, action) => {
      state.meterRoutingsList = action.payload;
    },
    setCommandCategory: (state, action) => {
      state.commandCategoryList = action.payload;
    },
    setCommandListByCategory: (state, action) => {
      state.commandByCategoryList = action.payload;
    },
    setMeterCommandsList: (state, action) => {
      state.meterCommandsList = action.payload;
    },
    setMeterAllCommandsList: (state, action) => {
      state.meterAllCommandsList = action.payload;
    },
    setMeterProfilesData: (state, action) => {
      state.meterProfileDataList = action.payload;
    }
  }
});

export const {
  setAllMetersList,
  setMeterDetails,
  setMeterProfilesDetail,
  setMeterEventDetails,
  getMeterDropdownDetail,
  setMeterProfilesData,
  setMeterEntities,
  setCommandCategory,
  setCommandListByCategory,
  setMeterCommandsList,
  setMeterRoutings,
  setMeterAllCommandsList,
  setDownloadDetails
} = metersSlice.actions;
export default metersSlice.reducer;
