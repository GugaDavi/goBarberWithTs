/**
 * Data Types
 */

export interface IUser {
  id: number;
  name: string;
  email: string;
  provider: boolean;
  avatar_id?: number;
  avatar?: {
    id?: number;
    url?: string;
    path?: string;
  };
}

/**
 * State Types
 */

export interface ProfileState {
  user?: IUser;
}

/**
 * Actions Types
 */

export enum ProfileActions {
  UPDATE_PROFILE_REQUEST = "@profile/UPDATE_PROFILE_REQUEST",
  UPDATE_PROFILE_SUCCESS = "@profile/UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAILURE = "@profile/UPDATE_PROFILE_FAILURE"
}

export interface UpdateProfileRequest {
  type: typeof ProfileActions.UPDATE_PROFILE_REQUEST;
  payload: {
    name?: string;
    email?: string;
    avatar_id?: number;
    oldPassword?: string;
    password?: string;
    confirmPassword?: string;
  };
}

export interface UpdateProfileSuccess {
  type: typeof ProfileActions.UPDATE_PROFILE_SUCCESS;
  payload: IUser;
}

export interface UpdateProfileFailure {
  type: typeof ProfileActions.UPDATE_PROFILE_FAILURE;
}

export type ProfileActionsTypes =
  | UpdateProfileRequest
  | UpdateProfileSuccess
  | UpdateProfileFailure;
