// slices/teamSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  expertise: Expertise[]; 
  contacts: string[];
  email: string;
  bio: string;
  twitter: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  location: string[];
  image_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expertise {
    _id: string;
    name: string;
   
  }

interface TeamState {
  team: TeamMember[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  team: [],
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<TeamMember[] | undefined>) => {
        state.team = action.payload ?? []; // ✅ never undefined
        state.loading = false;
        state.error = null;
      },
    addTeamMember: (state, action: PayloadAction<TeamMember>) => {
      state.team.push(action.payload);
    },
    updateTeamMember: (state, action: PayloadAction<TeamMember>) => {
      const index = state.team.findIndex(
        (member) => member._id === action.payload._id
      );
      if (index !== -1) {
        state.team[index] = action.payload;
      }
    },
    deleteTeamMember: (state, action: PayloadAction<string>) => {
      state.team = state.team.filter((member) => member._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearTeam: (state) => {
      state.team = [];
      state.error = null;
    },
  },
});

export const {
  setTeam,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  setLoading,
  setError,
  clearTeam,
} = teamSlice.actions;

export default teamSlice.reducer;
