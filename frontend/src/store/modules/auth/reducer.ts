import produce from "immer";

import { AuthState, AuthActionsTypes, AuthActions } from "./types";

const INITIAL_STATE: AuthState = {
  token: undefined,
  signed: false,
  loading: false
};

const reducer = (state = INITIAL_STATE, action: AuthActionsTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.SIGN_IN_REQUEST:
      case AuthActions.SIGN_UP_REQUEST:
        draft.loading = true;
        break;
      case AuthActions.SIGN_IN_SUCCESS:
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      case AuthActions.SIGN_FAILURE:
      case AuthActions.SIGN_UP_SUCCESS:
        draft.loading = false;
        break;
    }
  });
};

export default reducer;
