const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLogin: false,
  isError: false,
  userData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser(state, action) {
      state.userData = action.payload;
      state.isLogin = true;
    },
    logout(state, action) {
      state.userData = {};
      state.isLogin = false;
      document.cookie = 'access_key' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
  },
});

export default userSlice.reducer;
export const { loginUser,logout } = userSlice.actions;
