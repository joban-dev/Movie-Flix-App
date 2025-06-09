import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './Reducers/movieSlice'
import  personReducer from "./Reducers/personSlice";
import tvReducer from './Reducers/tvSlice'

export const store = configureStore({
    reducer: {
        movie:movieReducer,
        person:personReducer,
        tv:tvReducer,
    },
  })