import { todoActions, todoExtraReducer } from "./reducers/todoSlice";

export const AllActionCreators = {
  ...todoActions,
  ...todoExtraReducer,
};
