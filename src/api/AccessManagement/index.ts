import { createQueryString } from 'src/utils/helper';
import { instance } from '../index';
import { removeUserFromList, setModules, setRoleModuleMapping, setRoles, setUserList } from 'src/reducers/AccessManagement';

export const getUserList: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(`/User/GetUserList?${queryString}`);
      dispatch(setUserList(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};

export const register: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.post(`/User/Register`, apiData);
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};
export const updateUserDetail: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.post(`/User/UpdateUserDetail`, apiData);
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};
export const setUserStatus: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {  
      const res = await instance.post(`/User/SetUserStatus`, apiData);
      dispatch(removeUserFromList(res))
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};

export const deleteUserList: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.delete(`/User/DeleteUserList`, {
        data: apiData  
      });
      // dispatch(setCurrentRTCDrift(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};

///// for role management

export const getRoles: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.get(`/User/GetRoles`);
      dispatch(setRoles(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};

export const getModules : any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try { 
      const res = await instance.get(`/User/GetModules`);
      dispatch(setModules(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};
 
export const updateRoleModuleMapping : any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try { 
      const res = await instance.post(`/User/UpdateRoleModuleMapping`,apiData);
      // dispatch(setUpdateRoleModuleMapping(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};

export const deleteRole: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.delete(`/User/DeleteRole`, {
        data: apiData  
      }); 
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};

export const getRoleModuleMapping: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(`User/GetRoleModuleMapping?${queryString}`);
      dispatch(setRoleModuleMapping(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      reject(error);
    }
  });
};

