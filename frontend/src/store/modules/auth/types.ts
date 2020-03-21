/**
 * State Props
 */

import { IUser } from "../user/types";

export interface AuthState {
  token?: string;
  signed: boolean;
  loading: boolean;
}

/**
 * Actions Types
 */

export enum AuthActions {
  SIGN_IN_REQUEST = "@auth/SIGN_IN_REQUER",
  SIGN_IN_SUCCESS = "@auth/SIGN_IN_SUCCESS",
  SIGN_UP_REQUEST = "@auth/SIGN_UP_REQUEST",
  SIGN_UP_SUCCESS = "@auth/SIGN_UP_SUCCESS",
  SIGN_FAILURE = "@auth/SIGN_FAILURE",
  SIGN_OUT = "@auth/SIGN_OUT"
}

export interface SignInRequest {
  type: typeof AuthActions.SIGN_IN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

export interface SignInSuccess {
  type: typeof AuthActions.SIGN_IN_SUCCESS;
  payload: {
    user: IUser;
    token: string;
  };
}

export interface SignUpRequest {
  type: typeof AuthActions.SIGN_UP_REQUEST;
  payload: {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  };
}

export interface SignUpSuccess {
  type: typeof AuthActions.SIGN_UP_SUCCESS;
}

export interface SignFailure {
  type: typeof AuthActions.SIGN_FAILURE;
}

export interface SignOut {
  type: typeof AuthActions.SIGN_OUT;
}

export type AuthActionsTypes =
  | SignInRequest
  | SignInSuccess
  | SignFailure
  | SignUpRequest
  | SignUpSuccess
  | SignOut;
