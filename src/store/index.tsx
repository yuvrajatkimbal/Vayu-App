import { configureStore } from '@reduxjs/toolkit';
import commonSlice from '../reducers/common/index';
import authenticationSlice from '../reducers/auth/index';
import metersSlice from '../reducers/Meters/index';
import accessManagementSlice from '../reducers/AccessManagement/index';

export const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authenticationSlice,
    meters: metersSlice,
    accessManagement: accessManagementSlice,
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
