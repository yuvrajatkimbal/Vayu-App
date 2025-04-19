import axios from 'axios';
import { instance } from '../index';
import {
  setAllMetersList,
  getMeterDropdownDetail,
  setDownloadDetails,
  setMeterDetails,
  setMeterEventDetails,
  setMeterProfilesDetail,
  setMeterProfilesData,
  setMeterEntities,
  setMeterRoutings,
  setCommandCategory,
  setCommandListByCategory,
  setMeterCommandsList,
  setMeterAllCommandsList
} from 'src/reducers/Meters';
import { createQueryString } from 'src/utils/helper';

export const getAllMetersList: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(`/Meters/GetMeters?${queryString}`);
      dispatch(setAllMetersList(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error?.data);
    }
  });
};

export const getMeterDropdownDetailHandler: any =
  (apiData) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const queryString = createQueryString(apiData);
        const res = await instance.get(
          `/Meters/GetMeterDropdownDetail?${queryString}`
        );
        dispatch(getMeterDropdownDetail(res?.data));
        resolve(res?.data);
      } catch (error) {
        //@ts-ignore

        reject(error);
      }
    });
  };

export const getMeterDetails: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(`/Meters/GetMeterDetails?${queryString}`);
      dispatch(setMeterDetails(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

export const getMeterProfileDetails: any =
  (apiData) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const queryString = createQueryString(apiData);
        const res = await instance.get(
          `/Meters/GetProfileDetails?${queryString}`
        );
        dispatch(setMeterProfilesDetail(res?.data));
        resolve(res?.data);
      } catch (error) {
        //@ts-ignore

        reject(error);
      }
    });
  };

export const getMeterEventDetails: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(
        `/Meters/GetProfileDetails?${queryString}`
      );
      dispatch(setMeterEventDetails(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

// export const getDownloadDetails: any = (apiData) => async (dispatch: any) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const queryString = createQueryString(apiData);
//       const res = await instance.get(`/Meters/GetDownloadDetails?${queryString}`);
//       dispatch(setDownloadDetails(res?.data?.meterDownloadList));
//       resolve(res?.data);
//     } catch (error) {
//       //@ts-ignore
//       console.log('error============', error);
//       reject(error);
//     }
//   });
// };

export const getDownloadDetails: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(
        `/Meters/GetDownloadDetails?${queryString}`
      );

      if (res?.data?.meterDownloadList) {
        dispatch(setDownloadDetails(res?.data?.meterDownloadList));
        resolve(res?.data);
      } else {
        console.error('meterDownloadList is missing in response');
        reject(new Error('meterDownloadList is missing in response'));
      }
    } catch (error) {
      console.error('Error fetching download details:', error);
      reject(error);
    }
  });
};

export const sendDownloadRequest: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.post(`/Meters/SendDownloadRequest`, apiData);
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

export const uploadMeterDetails: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.post(`/Meters/UpdateMeterDetails`, apiData);
      resolve(res);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

export const getMeterProfilesData: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (apiData.EventProfileTypeList.length === 1) {
        const profileNameMapping: { [key: string]: string } = {
          'Current Profile': 'CURRENTPROFILE',
          'Other Profile': 'OTHERPROFILE',
          'Power Profile': 'POWERPROFILE',
          'RC/DC Profile': 'CONNECTDISCONNECTPROFILE',
          'Voltage Profile': 'VOLTAGEPROFILE',
          'Non-Rollover Profile': 'NONROLLOVERPROFILE',
          'Transaction Profile': 'TRANSACTIONPROFILE'
        };

        const currentProfile = apiData.EventProfileTypeList[0];

        // Change the name if a matching profile is found
        if (profileNameMapping[currentProfile]) {
          apiData.EventProfileTypeList[0] = profileNameMapping[currentProfile];
        }
      }
      const res = await instance.post(`/Meters/GetMeterProfileData`, apiData);
      // dispatch(setMeterProfilesData(res?.data));
      // resolve(res?.data);
      if (res?.data) {
        dispatch(setMeterProfilesData(res?.data));
        resolve(res?.data);
      } else {
        console.error('meter data is missing in response');
        reject(new Error('meter data is missing in response'));
      }
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

// export const getMeterProfilesData: any = (apiData: any) => async (dispatch: any) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Validate `EventProfileTypeList`
//       if (!Array.isArray(apiData?.EventProfileTypeList) || apiData.EventProfileTypeList.length === 0) {
//         throw new Error('EventProfileTypeList is missing or invalid.');
//       }

//       if (apiData.EventProfileTypeList.length === 1) {
//         const profileNameMapping: { [key: string]: string } = {
//           'Current Profile': 'CURRENTPROFILE',
//           'Other Profile': 'OTHERPROFILE',
//           'Power Profile': 'POWERPROFILE',
//           'RC/DC Profile': 'CONNECTDISCONNECTPROFILE',
//           'Voltage Profile': 'VOLTAGEPROFILE',
//           'Non-Rollover Profile': 'NONROLLOVERPROFILE',
//           'Transaction Profile': 'TRANSACTIONPROFILE',
//         };

//         const currentProfile = apiData.EventProfileTypeList[0];

//         // Change the name if a matching profile is found
//         if (profileNameMapping[currentProfile]) {
//           apiData.EventProfileTypeList[0] = profileNameMapping[currentProfile];
//         }
//       }

//       // Call the instance
//       const res = await instance.post(`/Meters/GetMeterProfileData`, apiData);

//       // Validate the instance response
//       if (!res?.data) {
//         throw new Error('instance response is missing or invalid.');
//       }

//       // Dispatch action
//       dispatch(setMeterProfilesData(res.data));
//       resolve(res.data);
//     } catch (error) {
//       // Log error details
//       console.error('Error fetching meter profile data:', error);

//       // Provide a meaningful rejection message
//       reject({
//         message: 'Failed to fetch meter profile data',
//         details: error?.response?.data || error.message || error,
//       });
//     }
//   });
// };

export const getMeterRawData: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const queryString = createQueryString(apiData);
      const res = await instance.post(`/HESRawData/GetHESRawData`, apiData);
      dispatch(setMeterProfilesData(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

export const getMeterEntities: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(
        `/MeterEntity/GetMeterEntities?${queryString}`
      );
      dispatch(setMeterEntities(res?.data?.entityList));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

export const getMeterRoutings: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.post(`/MeterRouting/GetMeterRouting`, apiData);
      dispatch(setMeterRoutings(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};
export const getMeterRoutingList: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.post(
        `/MeterRouting/GetMeterRoutingHistory`,
        apiData
      );
      dispatch(setMeterRoutings(res?.data));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

export const getCommandCategory: any = (apiData) => async (dispatch: any) => {
  const queryString = createQueryString(apiData);
  return new Promise(async (resolve, reject) => {
    try {
      const res = await instance.get(
        `/HESCommand/GetCommandCategory?${queryString}`
      );
      dispatch(setCommandCategory(res?.data?.commandCategoryList));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

export const getCommandListByCategory: any =
  (apiData) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await instance.post(
          `/HESCommand/GetCommandListByCategory`,
          apiData
        );
        dispatch(setCommandListByCategory(res?.data?.commandList));
        resolve(res?.data);
      } catch (error) {
        //@ts-ignore

        reject(error);
      }
    });
  };

export const getMeterAllCommandsList: any =
  (apiData) => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await instance.post(
          `/HESCommand/GetCommandListByCategory`,
          apiData
        );
        dispatch(setMeterAllCommandsList(res?.data?.commandList));
        resolve(res?.data);
      } catch (error) {
        //@ts-ignore

        reject(error);
      }
    });
  };

export const getMeterCommandsList: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = createQueryString(apiData);
      const res = await instance.get(
        `/HESCommand/GetHesCommands?${queryString}`
      );
      dispatch(setMeterCommandsList(res?.data?.hesCommandList));
      resolve(res?.data);
    } catch (error) {
      //@ts-ignore

      reject(error);
    }
  });
};

export const runMeterCommand: any = (apiData) => async (dispatch: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if CommandValue is an object
      let commandValueString;
      if (typeof apiData?.CommandValue === 'object') {
        // If CommandValue is an object, stringify and encode it
        commandValueString = encodeURIComponent(
          JSON.stringify(apiData?.CommandValue)
        );
      } else {
        // If CommandValue is not an object, use it as is
        commandValueString = apiData?.CommandValue;
      }

      // Construct the instance URL based on the type of CommandValue
      const res = await instance.get(
        `/HES/RequestOnDemandData?MeterNo=${apiData?.MeterNo}&CommandType=${apiData?.CommandType}&CommandValue=${commandValueString}&IsDlms=${apiData?.IsDlms}&Project=${apiData?.Project}`
      );

      resolve(res?.data);
    } catch (error) {
      reject(error);
    }
  });
};
