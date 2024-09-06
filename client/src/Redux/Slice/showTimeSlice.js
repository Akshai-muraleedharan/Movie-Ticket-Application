import { createSlice } from '@reduxjs/toolkit'


let time
let payment
let seat
const initialState = {
  value:time,
  payment:payment,
  seat:seat
}

export const showTimeSlice = createSlice({
    name:'payment',
    initialState,

    reducers:{
        movieTime:(state,action) => {
           state.value = action.payload
        },
        moviePayment:(state,action) => {
            state.payment = action.payload
        },
        seatNumber:(state,action) => {
          state.seat = action.payload
        }
    }
})


export const { movieTime,moviePayment,seatNumber} =showTimeSlice.actions

export default showTimeSlice.reducer