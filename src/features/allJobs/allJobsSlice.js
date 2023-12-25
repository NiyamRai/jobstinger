import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFilterState = {
  search: " ",
  searchStatus: "all",
  searchType: "all",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isloading: false,
  jobs: [],
  totalJobs: 0,
  numberOfpages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};

export const getallJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
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
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilterState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {
    [getallJobs.pending]: (state) => {
      state.isloading = true;
    },
    [getallJobs.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.jobs = payload.jobs;
      state.numberOfpages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
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
      state.stats = payload?.defaultStats;
      state.monthlyApplications = payload?.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isloading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
} = allJobSlice.actions;

export default allJobSlice.reducer;
