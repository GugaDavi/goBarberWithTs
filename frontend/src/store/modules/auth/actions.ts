import { AuthActionsTypes, AuthActions } from "./types";
import { IUser } from "../user/types";

export function signInRequest(
  email: string,
  password: string
): AuthActionsTypes {
  return {
    type: AuthActions.SIGN_IN_REQUEST,
    payload: { email, password }
  };
}

export function signInSuccess(user: IUser, token: string): AuthActionsTypes {
  return {
    type: AuthActions.SIGN_IN_SUCCESS,
    payload: { user, token }
  };
}

export function signUpRequest(
  name: string,
  email: string,
  password: string,
  confirm_password: string
): AuthActionsTypes {
  return {
    type: AuthActions.SIGN_UP_REQUEST,
    payload: { email, name, password, confirm_password }
  };
}

export function signUpSuccess(): AuthActionsTypes {
  return {
    type: AuthActions.SIGN_UP_SUCCESS
  };
}

export function signFailure(): AuthActionsTypes {
  return {
    type: AuthActions.SIGN_FAILURE
  };
}

export function signOut(): AuthActionsTypes {
  return {
    type: AuthActions.SIGN_OUT
  };
}
