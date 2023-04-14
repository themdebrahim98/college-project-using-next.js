const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  hour: "10",
  minuete: "00",
  amPm: "AM",
};
const timerSlice = createSlice({
  name: "timePicker",
  initialState: initialState,
  reducers: {
    addHour(state, action) {
      state.hour = action.payload;
    },
    addMinuete(state, action) {
      state.minuete = action.payload;
    }
  },
});

export default timerSlice.reducer;
export const { addHour, addMinuete } = timerSlice.actions;
