import produce from "immer";

import { AuthActionsTypes, AuthActions } from "../auth/types";
import { ProfileActions, ProfileActionsTypes } from "../user/types";
import { ProfileState } from "./types";

const INITIAL_STATE: ProfileState = {};

const reducer = (
  state = INITIAL_STATE,
  action: AuthActionsTypes | ProfileActionsTypes
) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.SIGN_IN_SUCCESS:
        draft.user = action.payload.user;
        break;
      case ProfileActions.UPDATE_PROFILE_SUCCESS:
        draft.user = action.payload;
        break;
      case AuthActions.SIGN_OUT:
        draft.user = undefined;
        break;
    }
  });
};

export default reducer;
