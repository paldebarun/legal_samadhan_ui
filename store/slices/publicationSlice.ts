// slices/publicationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Publication {
  title: string;
  description: string;
  authors: string[];
  link: string;
  practice_area?: { name: string };
  published_on: string; 
}

interface PublicationState {
  publications: Publication[];
  practiceAreas: string[];
  years: string[];
  loading: boolean;
  error: string | null;
}

const initialState: PublicationState = {
  publications: [],
  practiceAreas: ["All"],
  years: ["All"],
  loading: false,
  error: null,
};

const publicationSlice = createSlice({
  name: "publications",
  initialState,
  reducers: {
    setPublications: (
      state,
      action: PayloadAction<{
        publications: Publication[];
        practiceAreas: string[];
        years: string[];
      }>
    ) => {
      state.publications = action.payload.publications;
      state.practiceAreas = action.payload.practiceAreas;
      state.years = action.payload.years;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearPublications: (state) => {
      state.publications = [];
      state.practiceAreas = ["All"];
      state.years = ["All"];
      state.error = null;
    },
  },
});

export const { setPublications, setLoading, setError, clearPublications } =
  publicationSlice.actions;

export default publicationSlice.reducer;
