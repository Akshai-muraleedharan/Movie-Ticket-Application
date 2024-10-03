import { createSlice } from '@reduxjs/toolkit'


let  position;

const initialState = {
    position:position

}

export const adminSlice = createSlice({
    name:'admin',
    initialState,

    reducers:{
      adminPostion:(state,action) => {
        state.position = action.payload
     }
    }
})


export const {adminPostion} =adminSlice.actions

export default adminSlice.reducer