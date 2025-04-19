import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  pageTitle: '',
  subTitle: '',
  subTitle1: '',
  projectName: '',
  modalVisible: false,
  sourceEndPointList: [],
  hopeCountList: [],
  projectList: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
    setSubTitle: (state, action) => {
      state.subTitle = action.payload;
    },
    setSubTitle1: (state, action) => {
      state.subTitle1 = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    setProject: (state, action) => {
      state.projectName = action.payload;
    },
    setRoutingSourceEndpoint: (state, action) => {
      state.sourceEndPointList = action.payload;
    },
    setRoutingHopeCount: (state, action) => {
      state.hopeCountList = action.payload;
    },
    setProjectList: (state, action) => {
      state.projectList = action.payload;
    }
  }
});

export const {
  setPageTitle,
  setSubTitle,
  setSubTitle1,
  setModalVisible,
  setProject,
  setRoutingSourceEndpoint,
  setRoutingHopeCount,
  setProjectList
} = commonSlice.actions;
export default commonSlice.reducer;
