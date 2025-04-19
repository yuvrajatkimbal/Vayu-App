import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userName: string;
  isActive: boolean;
  // Add any other properties the user might have
}

interface UserListState {
  userList: {
    userList: User[];
  };
  roles: string[];
  moduleList: string[];
  roleModuleMapping: string[];
  permission:string[]
}

const initialState: UserListState = {
  userList: {
    userList: [] // Array of users inside userList object
  },
  roles: [],
  moduleList:[],
  roleModuleMapping:[],
  permission:[]

};

const accessManagementSlice = createSlice({
  name: 'accessManagement',
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    }, 
    setModules: (state, action) => {
      state.moduleList = action.payload;
    }, 
    setRoleModuleMapping: (state, action) => {
      state.roleModuleMapping = action.payload;
    }, 
    setPermission: (state, action) => {
      state.permission = action.payload;
    }, 
    removeUserFromList: (state, action: PayloadAction<any>) => {
      let res = action?.payload?.config?.data || action.payload;
      try {
        res = JSON.parse(res);
      } catch (error) {
        console.error('Error parsing the response:', error);
      } 
      if (state.userList?.userList) {
        state.userList.userList = state.userList.userList.map((user) => { 
          if (user.userName === res.userName) {
            return { ...user, isActive: res.isActivate };  
          }
          return user;
        });
      } else {
        console.error('userList or userList.userList is undefined');
      }
  }}
});

export const { setUserList, setPermission , setRoles, setModules, setRoleModuleMapping, removeUserFromList } =
  accessManagementSlice.actions;
export default accessManagementSlice.reducer;
