
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  _id: string;
  practices: string[];
  experience: number;
  locations: string[];
  requirements: string[];
  category: "legal_professionals" | "management_professionals" | "internship";
  createdAt: string; 
  updatedAt: string; 
}

interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
      state.loading = false;
      state.error = null;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearJobs: (state) => {
      state.jobs = [];
      state.error = null;
    },
  },
});

export const { setJobs, addJob, removeJob, setLoading, setError, clearJobs } =
  jobSlice.actions;

export default jobSlice.reducer;
