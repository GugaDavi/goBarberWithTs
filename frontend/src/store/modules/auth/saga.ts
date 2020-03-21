import { all, takeLatest, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "~/services/api";
import history from "~/services/history";
import Routes from "~/routes/const_routes";

import { AuthActions, SignInRequest, SignUpRequest } from "./types";
import { signInSuccess, signFailure, signUpSuccess } from "./actions";

function* signIn({ payload }: SignInRequest) {
  const { email, password } = payload;

  try {
    const resp = yield call(api.post, "/sessions", {
      email,
      password
    });

    const { user, token } = resp.data;

    if (user && token) {
      if (!user.provider) {
        toast.warn("Usúario não é um prestador");
        return yield put(signFailure());
      }

      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(signInSuccess(user, token));

      return history.push(Routes.dashboard);
    }
  } catch (error) {
    toast.error("Erro na autenticação");
    yield put(signFailure());
  }
}

function* signUp({ payload }: SignUpRequest) {
  try {
    const { name, email, password, confirm_password } = payload;

    yield call(api.post, "/users", {
      name,
      email,
      password,
      confirm_password,
      provider: true
    });

    history.push("/");
    yield put(signUpSuccess());
  } catch (error) {
    console.tron.log(error);
    toast.error("Falha na criação do usuario. Poderia tentar novamete?");
    yield put(signFailure());
  }
}

function setToken({ payload }: any) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

function singOut() {
  history.push("/");
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(AuthActions.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthActions.SIGN_UP_REQUEST, signUp),
  takeLatest(AuthActions.SIGN_OUT, singOut)
]);
