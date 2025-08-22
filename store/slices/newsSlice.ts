// slices/newsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewsEvent {
  _id: string;
  title: string;
  category: string;
  date: string;
  linkedin_url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface NewsState {
  newsEvents: NewsEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  newsEvents: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsEvents: (state, action: PayloadAction<NewsEvent[]>) => {
      state.newsEvents = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearNewsEvents: (state) => {
      state.newsEvents = [];
      state.error = null;
    },
  },
});

export const { setNewsEvents, setLoading, setError, clearNewsEvents } =
  newsSlice.actions;

export default newsSlice.reducer;
