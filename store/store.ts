// store.ts
import { configureStore } from "@reduxjs/toolkit";
import publicationReducer from "./slices/publicationSlice";
import newsReducer from './slices/newsSlice';
import teamReducer from './slices/teamSlice'
import jobReducer from './slices/jobSlice'

export const store = configureStore({
  reducer: {
    publication: publicationReducer,
    news:newsReducer,
    team:teamReducer,
    job:jobReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
