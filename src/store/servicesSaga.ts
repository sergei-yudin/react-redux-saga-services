import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchServiceDetails, fetchServices } from "../api/servicesApi";
import type { ServiceDetails, ServiceSummary } from "../types/service";
import {
  serviceDetailsFailed,
  serviceDetailsRequested,
  serviceDetailsSucceeded,
  servicesFailed,
  servicesRequested,
  servicesSucceeded,
} from "./servicesSlice";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Произошла неизвестная ошибка";

function* loadServices() {
  try {
    const services: ServiceSummary[] = yield call(fetchServices);
    yield put(servicesSucceeded(services));
  } catch (error) {
    yield put(servicesFailed(getErrorMessage(error)));
  }
}

function* loadServiceDetails(action: PayloadAction<number>) {
  try {
    const service: ServiceDetails = yield call(
      fetchServiceDetails,
      action.payload,
    );
    yield put(serviceDetailsSucceeded(service));
  } catch (error) {
    yield put(serviceDetailsFailed(getErrorMessage(error)));
  }
}

export function* servicesSaga() {
  yield takeLatest(servicesRequested.type, loadServices);
  yield takeLatest(serviceDetailsRequested.type, loadServiceDetails);
}
