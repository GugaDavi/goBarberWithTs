import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware, Store } from "redux";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import perisistedStore from "./persistReducers";

import { AuthState } from "./modules/auth/types";
import { ProfileState } from "./modules/user/types";

const sagaMiddleware = createSagaMiddleware();

export interface ApplicationState {
  auth: AuthState;
  profile: ProfileState;
}

const store: Store<ApplicationState> = createStore(
  perisistedStore(rootReducer),
  applyMiddleware(sagaMiddleware)
);

const persist = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persist };
