import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ),
    reducer: {
        // Here we will add our reducers
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    }
})