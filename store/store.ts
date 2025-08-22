// store.ts
import { configureStore } from "@reduxjs/toolkit";
import publicationReducer from "./slices/publicationSlice";
import newsReducer from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    publication: publicationReducer,
    news:newsReducer
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
