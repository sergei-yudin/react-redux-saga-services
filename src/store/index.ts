import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { servicesSaga } from "./servicesSaga";
import servicesReducer from "./servicesSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { services: servicesReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(servicesSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
