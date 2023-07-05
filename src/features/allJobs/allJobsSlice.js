import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFilterState = {
  search: " ",
  searchStatus: "all",
  searchType: "all",
  sortoptipn: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isloading: false,
  jobs: [],
  totaljobs: 0,
  numberOfpages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};

export const getallJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    let url = `/jobs`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/jobs/stats");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const allJobSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isloading = true;
    },
    hideLoading: (state) => {
      state.isloading = false;
    },
  },
  extraReducers: {
    [getallJobs.pending]: (state) => {
      state.isloading = true;
    },
    [getallJobs.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.jobs = payload.jobs;
    },
    [getallJobs.rejected]: (state, { payload }) => {
      state.isloading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isloading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isloading = false;
      toast.error(payload);
    },
  },
});

export const { showLoading, hideLoading } = allJobSlice.actions;

export default allJobSlice.reducer;
