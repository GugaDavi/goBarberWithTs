import { all, put, call, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import api from "~/services/api";

import { ProfileActions, UpdateProfileRequest, IUser } from "./types";
import { updateProfileSuccess, updateProfileFailure } from "./actions";

interface Resp {
  upadatedUser?: IUser;
}

function* updateProfile({ payload }: UpdateProfileRequest) {
  const { name, email, avatar_id, ...rest } = payload;

  try {
    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const resp: AxiosResponse<Resp> = yield call(api.put, "/users", profile);

    const { upadatedUser } = resp.data;

    if (upadatedUser) {
      yield put(updateProfileSuccess(upadatedUser));
      toast.success("Úsuario atualizado com sucesso");
      return;
    }
  } catch (error) {
    console.tron.log(error);
    yield put(updateProfileFailure());
    toast.error("Erro na atualização do úsuario");
  }
}

export default all([
  takeLatest(ProfileActions.UPDATE_PROFILE_REQUEST, updateProfile)
]);
