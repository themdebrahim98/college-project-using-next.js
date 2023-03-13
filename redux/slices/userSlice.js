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
  },
});

export default userSlice.reducer;
export const { loginUser } = userSlice.actions;
