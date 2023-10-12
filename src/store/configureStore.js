// import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
// import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducer,
  // middleware: [sagaMiddleware],
});

// sagaMiddleware.run(rootSaga);
