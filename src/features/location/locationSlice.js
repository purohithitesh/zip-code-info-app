import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    countryCode: "",
    postalCode: "",
    locationData: null,
    error: null,
    loading: false,
  },
  reducers: {
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    receiveData: (state, action) => {
      state.locationData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.locationData = null;
      state.loading = false;
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCountryCode,
  setPostalCode,
  receiveData,
  setError,
  setLoading,
} = locationSlice.actions;

export const selectCountryCode = (state) => state.location.countryCode;
export const selectPostalCode = (state) => state.location.postalCode;
export const selectLocationData = (state) => state.location.locationData;
export const selectError = (state) => state.location.error;
export const selectLoading = (state) => state.location.loading;

export default locationSlice.reducer;
