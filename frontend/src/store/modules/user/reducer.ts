import produce from "immer";

import { AuthActionsTypes, AuthActions } from "../auth/types";
import { ProfileState } from "./types";

const INITIAL_STATE: ProfileState = {};

const reducer = (state = INITIAL_STATE, action: AuthActionsTypes) => {
  switch (action.type) {
    case AuthActions.SIGN_IN_SUCCESS:
      return produce(state, draft => {
        draft.user = action.payload.user;
      });
    default:
      return state;
  }
};

export default reducer;
