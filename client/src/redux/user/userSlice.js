import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  currentUser: null,
  loading: false,
  errorMsg: null
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.currentUser = null;
      state.loading = true;
      state.errorMsg = null;
    }
    , signUpSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.errorMsg = null;
    }
    , signUpFail: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


  }
})


export const { signUpStart, signUpSuccess, signUpFail, updateStart, updateSuccess, updateFailure } = userSlice.actions

export default userSlice.reducer