import { createSlice } from '@reduxjs/toolkit'


let  position;
let email;
const initialState = {
    position:position,
    email:email
}

export const adminSlice = createSlice({
    name:'admin',
    initialState,

    reducers:{
      adminPostion:(state,action) => {
        state.position = action.payload
     },
     adminEmail:(state,action) => {
      state.email = action.payload
     }

    }
})


export const {adminPostion,adminEmail} =adminSlice.actions

export default adminSlice.reducer