import axios from 'axios';
import {instance} from '../index';
import {
  setActiveSession,
  setLogin,
  setModuleListByRole
} from '../../reducers/auth/index';

export const loginAction: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.post(`/Authentication/Login`, apiData);
      resolve(res?.data);
      dispatch(setLogin(res?.data));
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};
export const handleActiveSessionAction: any =
  (apiData) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await instance.post(
          `/Authentication/HandleActiveSession`,
          apiData
        );
        resolve(res?.data);
        dispatch(setActiveSession(res?.data));
      } catch (error) {
        //@ts-ignore
        console.log('err', error.response);
        reject(error);
      }
    });
  };

export const getModuleListByRoleAction: any =
  () => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await instance.get(`/User/GetModuleListByRole`);
        resolve(res?.data);
        dispatch(setModuleListByRole(res?.data));
      } catch (error) {
        //@ts-ignore
        console.log('err', error.response);
        reject(error);
      }
    });
  };

export const logOutAction: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.post(`/Authentication/LogOut`, apiData); 
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};
