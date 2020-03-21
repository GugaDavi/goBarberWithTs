import { ProfileActions, ProfileActionsTypes, IUser } from "./types";

interface IUpdateProfileRequest {
  name?: string;
  email?: string;
  avatar_id?: number;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export function updateProfileRequest({
  name,
  email,
  avatar_id,
  oldPassword,
  password,
  confirmPassword
}: IUpdateProfileRequest): ProfileActionsTypes {
  return {
    type: ProfileActions.UPDATE_PROFILE_REQUEST,
    payload: {
      name,
      email,
      avatar_id,
      oldPassword,
      password,
      confirmPassword
    }
  };
}

export function updateProfileSuccess(user: IUser): ProfileActionsTypes {
  return {
    type: ProfileActions.UPDATE_PROFILE_SUCCESS,
    payload: user
  };
}

export function updateProfileFailure(): ProfileActionsTypes {
  return {
    type: ProfileActions.UPDATE_PROFILE_FAILURE
  };
}
