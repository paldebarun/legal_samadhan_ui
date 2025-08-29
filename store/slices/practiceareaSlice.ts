// slices/practiceAreaSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PracticeArea {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PracticeAreaState {
  practiceareas: PracticeArea[];
  loading: boolean;
  error: string | null;
}

const initialState: PracticeAreaState = {
  practiceareas: [],
  loading: false,
  error: null,
};

const practiceAreaSlice = createSlice({
  name: "practicearea",
  initialState,
  reducers: {
    setPracticeAreas: (state, action: PayloadAction<PracticeArea[]>) => {
      state.practiceareas = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearPracticeAreas: (state) => {
      state.practiceareas = [];
      state.error = null;
    },
  },
});

export const { setPracticeAreas, setLoading, setError, clearPracticeAreas } =
  practiceAreaSlice.actions;

export default practiceAreaSlice.reducer;
