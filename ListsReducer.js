import { ADD_LIST, FAILED, FETCH_LIST } from "../action/ListsAction"
const INITIAL_STATE = {
    lists: [],
    idlist: 0
}
const handleLists = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_LIST:
            {
                return Object.assign({}, state, { lists: action.data })
            }
        case ADD_LIST:
            {

                const newdata = state.boards.concat(action.data);
                return Object.assign({}, state, { lists: newdata })

            }
        case FAILED:
            {
                return Object.assign({}, state, { error_msg: action.data.error_msg });
            }

        default:
            return state;
    }
}
export default handleLists