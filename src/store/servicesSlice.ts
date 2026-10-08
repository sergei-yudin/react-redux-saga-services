import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ServiceDetails, ServiceSummary } from "../types/service";

interface RequestState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

interface ServicesState {
  list: RequestState<ServiceSummary[]>;
  details: RequestState<ServiceDetails | null>;
}

const initialState: ServicesState = {
  list: { data: [], loading: false, error: null },
  details: { data: null, loading: false, error: null },
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    servicesRequested(state) {
      state.list.loading = true;
      state.list.error = null;
    },
    servicesSucceeded(state, action: PayloadAction<ServiceSummary[]>) {
      state.list.data = action.payload;
      state.list.loading = false;
    },
    servicesFailed(state, action: PayloadAction<string>) {
      state.list.loading = false;
      state.list.error = action.payload;
    },
    serviceDetailsRequested(state, _action: PayloadAction<number>) {
      state.details.data = null;
      state.details.loading = true;
      state.details.error = null;
    },
    serviceDetailsSucceeded(state, action: PayloadAction<ServiceDetails>) {
      state.details.data = action.payload;
      state.details.loading = false;
    },
    serviceDetailsFailed(state, action: PayloadAction<string>) {
      state.details.loading = false;
      state.details.error = action.payload;
    },
  },
});

export const {
  serviceDetailsFailed,
  serviceDetailsRequested,
  serviceDetailsSucceeded,
  servicesFailed,
  servicesRequested,
  servicesSucceeded,
} = servicesSlice.actions;

export default servicesSlice.reducer;
