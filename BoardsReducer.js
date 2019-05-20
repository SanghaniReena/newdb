import { Add_BOARD, FAILED, FETCH_BOARD ,FETCH_ALL_BOARD} from "../action/BoardsAction"
const INITIAL_STATE = {
    boards: [],
    allBoards:[]
}
const handleBoards = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_BOARD:
            {
                return Object.assign({}, state, { boards: action.data })
            }
            case FETCH_ALL_BOARD:
            {
                return Object.assign({}, state, { allBoards: action.data })
            }

        case Add_BOARD:
            {
                const newdata = state.boards.concat(action.data);
                return Object.assign({}, state, { boards: newdata })

            }
        case FAILED:
            {
                return Object.assign({}, state, { error_msg: action.data.error_msg });
            }

        default:
            return state;
    }
}
export default handleBoards