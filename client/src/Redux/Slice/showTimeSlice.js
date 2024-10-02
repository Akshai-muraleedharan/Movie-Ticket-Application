import { createSlice } from '@reduxjs/toolkit'


let time
let payment
let seat
let movie
let type
const initialState = {
  value:time,
  payment:payment,
  seat:seat,
  movie:movie,
  type:type
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
        },
        movieName:(state,action) => {
          state.movie = action.payload
        },
        seatType:(state,action) => {
          state.type = action.payload
        }
    }
})


export const { movieTime,moviePayment,seatNumber,movieName,seatType} =showTimeSlice.actions

export default showTimeSlice.reducer