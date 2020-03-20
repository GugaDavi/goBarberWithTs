import { Reducer, CombinedState } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { AuthState, AuthActionsTypes } from "./modules/auth/types";
import { ProfileState } from "./modules/user/types";

export default (
  reducers: Reducer<
    CombinedState<{
      auth: AuthState;
      profile: ProfileState;
    }>,
    AuthActionsTypes
  >
) => {
  const persistedReducer = persistReducer(
    {
      key: "gobarber",
      storage,
      whitelist: ["auth", "user"]
    },
    reducers
  );

  return persistedReducer;
};
