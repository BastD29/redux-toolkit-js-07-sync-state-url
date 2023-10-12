import { combineReducers } from "redux";
import { searchReducer } from "./search";
import { filterReducer } from "./filter";
import { usersReducer } from "./users";

export default combineReducers({
  search: searchReducer,
  filter: filterReducer,
  users: usersReducer,
});
