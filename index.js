import { combineReducers } from "redux"
import BoardReducer from "../reducer/BoardsReducer"
import TeamReducer from "../reducer/TeamsReducer"
import UserRegReducer from "../reducer/UserRegReducer";
import TeamBoardsReducer from "../reducer/TeamBoardsReducer"
import ListsReducer from "../reducer/ListsReducer"
import CardsReducer from "../reducer/CardsReducer"
export const rootReducer = combineReducers({
    BoardReducer,
    UserRegReducer,
    TeamReducer,
    TeamBoardsReducer,
    ListsReducer,
    CardsReducer
});
export default rootReducer