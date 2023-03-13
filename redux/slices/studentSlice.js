const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const studentSlice = createSlice({
  name: "students",
  initialState: initialState,
  reducers: {
    addStudent(state, action) {},
  },
});

export default userSlice.reducer;
export const { loginUser } = userSlice.actions;
