import { createSlice } from '@reduxjs/toolkit'
const initialState ={
    currentUser : null,
    loading :false,
    errorMsg:null
}
export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
      signUpStart : (state) =>{
        state.currentUser = null;
        state.loading=true;
        state. errorMsg=null;
      }
      ,signUpSuccess:(state,action)=>{
          state.loading= false;
          state.currentUser = action.payload;
          state.errorMsg=null;
      }
      ,signUpFail:(state,action)=> {    
        state.loading = false;
        state.errorMsg=action.payload;
      }


}})


export const { signUpStart, signUpSuccess, signUpFail } = userSlice.actions

export default userSlice.reducer