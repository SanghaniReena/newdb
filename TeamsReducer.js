import { ADD_TEAM, FAILED, FETCH_TEAM } from "../action/TeamsAction"


const INITIAL_STATE = {
    teams: []
}
const handleteams = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_TEAM:
            {

                return Object.assign({}, state, { teams: action.data })
            }

        case ADD_TEAM:
            {
                const newdata = state.teams.concat(action.data);
                return Object.assign({}, state, { teams: newdata })
            }
        case FAILED:
            {
                return Object.assign({}, state, { error_msg: action.data.error_msg });
            }

        default:
            return state;
    }
}
export default handleteams