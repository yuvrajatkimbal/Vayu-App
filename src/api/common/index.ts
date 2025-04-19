import { instance } from '../index';
import { createQueryString } from 'src/utils/helper';
import {
  setProjectList,
  setRoutingHopeCount,
  setRoutingSourceEndpoint
} from 'src/reducers/common';

export const getRoutingSourceEndpoint: any =
  (apiData) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const queryString = createQueryString(apiData);
        const res = await instance.get(
          `/Meters/GetMeterDropdownDetail?${queryString}`
        );
        dispatch(setRoutingSourceEndpoint(res?.data?.dropdownDetailList));
        resolve(res?.data);
      } catch (error) {
        //@ts-ignore
        reject(error);
      }
    });
  };
export const getRoutingHopeCount: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(
        `/Meters/GetMeterDropdownDetail?${queryString}`
      );
      dispatch(setRoutingHopeCount(res?.data?.dropdownDetailList));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      
      reject(error);
    }
  });
};
export const getMeterProjectList: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try { 
      const res = await instance.get(
        `MeterProjects/getMeterProjectList `
      );
      dispatch(setProjectList(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore
      
      reject(error);
    }
  });
};
