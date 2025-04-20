// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import {
//   clearLocalStorage,
//   getErrorMessage,
//   getLocalStorage,
//   setLocalStorage
// } from 'src/utils/helper';
// import { logOutAction } from './auth';
// import { store } from 'src/store';
// import { showToast } from 'src/customHooks/ToastEmitter';

// export const API_URLS = {
//   baseURL: process.env.REACT_APP_BASE_URL_MAIN,
//   baseURLCmd: process.env.REACT_APP_BASE_URL_COMMANDS,
//   baseURLNMS: process.env.REACT_APP_BASE_URL_MAIN_NMS
// };

// export const instance = (baseURL) => {
//   return axios.create({
//     baseURL
//   });
// };

// export const api = instance(API_URLS.baseURL);
// export const api1 = instance(API_URLS.baseURLCmd);
// export const instance = instance(API_URLS.baseURLNMS);

// let isRefreshing = false;
// let refreshSubscribers = [];
// const handleConfig = (config: any) => {
//   const token = getLocalStorage('accessToken');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   if (config.data instanceof FormData) {
//     config.headers['Content-Type'] = 'multipart/form-data';
//   } else {
//     config.headers['Content-Type'] = 'application/json';
//   }
//   return config;
// };

// const logoutUser = () => {
//   store.dispatch(logOutAction({ userName: getLocalStorage('userName') }));
//   clearLocalStorage();
//   window.location.replace('/login');
// };

// const setupInterceptors = (axiosInstance) => {
//   axiosInstance.interceptors.request.use(
//     (config) => handleConfig(config),
//     (error) => Promise.reject(error)
//   );

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       if (response?.data?.accessToken) {
//         let projectList = [];
//         if (response?.data?.project) {
//           projectList = response?.data?.project.split(',');
//         }

//         setLocalStorage('accessToken', response.data.accessToken);
//         setLocalStorage('isAuthenticated', response.data.isAuthenticated);
//         projectList.length > 0 && setLocalStorage('project', projectList[0]);
//         projectList.length > 0 &&
//           setLocalStorage('projectList', response?.data?.project);
//       }
//       if (response?.data?.message === 'concurrent session') {
//         let projectList = [];
//         if (response?.data?.project) {
//           projectList = response?.data?.project.split(',');
//         }
//         setLocalStorage('isAuthenticated', response.data.isAuthenticated);
//         projectList.length > 0 && setLocalStorage('project', projectList[0]);
//         projectList.length > 0 &&
//           setLocalStorage('projectList', response?.data?.project);
//       }

//       return response;
//     },
//     (error) => {
//       if (error?.code === 'ERR_NETWORK') {
//         showToast(error?.message || 'Network error occurred', {
//           appearance: 'error'
//         });
//         // return Promise.reject(error?.response || 'Something went wrong!');
//         return;
//       }

//       const errorData = error?.response?.data;
//       if (typeof errorData === 'string' && errorData.includes('expired')) {
//         // logoutUser();
//         return;
//       }

//       let login;
//       const url = error?.response?.config?.url;
//       if (url) {
//         const splitUrl = url?.split('/');
//         login = splitUrl[splitUrl?.length - 1].toLowerCase();
//       }
//       // if (login !== 'login') {
//       //   const originalRequest = error.config;
//       //   if (error.response?.status === 401 && !originalRequest._retry) {
//       //     if (isRefreshing) {
//       //       return new Promise((resolve) => {
//       //         refreshSubscribers.push((token) => {
//       //           originalRequest.headers['Authorization'] = `Bearer ${token}`;
//       //           resolve(axios(originalRequest));
//       //         });
//       //       });
//       //     }
//       //     originalRequest._retry = true;
//       //     isRefreshing = true;
//       //     return new Promise((resolve, reject) => {
//       //       const access_token = getLocalStorage('accessToken');
//       //       axios
//       //         .post(`${API_URLS.baseURL}/Authentication/Login`, {
//       //           grantType: 'refresh_token',
//       //           refreshToken: access_token
//       //         })
//       //         .then((response) => {
//       //           const res = response.data;
//       //           setLocalStorage('accessToken', res.accessToken);
//       //           setLocalStorage('isAuthenticated', res.isAuthenticated);
//       //           originalRequest.headers[
//       //             'Authorization'
//       //           ] = `Bearer ${res.accessToken}`;
//       //           resolve(axios(originalRequest));
//       //           refreshSubscribers.forEach((callback) =>
//       //             callback(res.accessToken)
//       //           );
//       //         })
//       //         .catch((err) => {
//       //           // logoutUser();
//       //           // clearLocalStorage();
//       //           // window.location.replace('/login');
//       //           reject(err);
//       //         })
//       //         .finally(() => {
//       //           isRefreshing = false;
//       //           refreshSubscribers = [];
//       //         });
//       //     });
//       //   }
//       // }

//       if (error?.response?.status === 500 || error?.response?.status === 502) {
//         const errorMessage = getErrorMessage(error?.response?.data?.errorCode);
//         showToast(errorMessage, { appearance: 'error' });
//       } else if (error?.response?.status === 404) {
//         showToast('Something went wrong!', { appearance: 'error' });
//       } else {
//         return Promise.reject(error?.response || 'Something went wrong!');
//       }
//     }
//   );
// };

// setupInterceptors(api);
// setupInterceptors(api1);
// setupInterceptors(instance);

// export default instance;

import axios from 'axios';
import { getErrorMessage, getLocalStorage } from 'src/utils/helper';

const baseURL = process.env.REACT_APP_BASE_URL_MAIN_VAYU;

export const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor with toast handling
export const setupInterceptors = (
  addToast: (message: string, options: any) => void
) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const errorMessage = getErrorMessage(error?.response?.data?.errorCode);
        addToast(errorMessage, { appearance: 'error' });
      }
      return Promise.reject(error);
    }
  );
};

export default instance;
