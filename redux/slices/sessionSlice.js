const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading:false,
  isSuccess: false,
  isError: false,
  session: [],
  students:[]
};

const userSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    fetchStart(state,action){
        state.isLoading = true;
    },
    fetchStudentSuccess(state, action) {
     state.isLoading = false;
     state.students = action.payload;
     state.isSuccess =true
     
    },
    fetchSessionSuccess(state, action) {
        state.isLoading = false;
        state.session = action.payload;
        state.isSuccess = true
        
       },

    fetchError(state, action){
        state.isError = true
    },

   

   
  },
});

export default userSlice.reducer;
export const { fetchStart,fetchSessionSuccess, fetchAllSession,fetchStudentSuccess, fetchError } = userSlice.actions;
