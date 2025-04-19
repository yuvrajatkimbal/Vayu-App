import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  login: {},
  activeSession: {},
  moduleListByRole: {}
};

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setActiveSession: (state, action) => {
      state.login = action.payload;
    },
    setModuleListByRole: (state, action) => {
      const modifiedModules = action?.payload?.moduleListByRole?.map(
        (module) => {
          const [baseName] = module.moduleName.split(' - '); 
          return {
            ...module,
            screen: baseName
          };
        }
      );
      state.moduleListByRole = {
        ...action?.payload,
        moduleListByRole: modifiedModules
      };
    }
  }
});

export const { setLogin, setActiveSession, setModuleListByRole } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
