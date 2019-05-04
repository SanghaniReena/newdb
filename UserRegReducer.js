import {FAILED,FETCH_USERS,LOGOUT,USER_LOGIN,USER_REG} from "../action/UserRegAction"

const INITIAL_STATE = {
    users: [],
    auth: false,
    iduser: "",
    error_msg: "",
    error_msgl: "",


}
const handleReg = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_REG:
            {
                const newUser = state.users.concat(action.data);
                return Object.assign({}, state, { users: newUser });

            }
        case USER_LOGIN:
            {
                if (action.data.status === true) {
                    return Object.assign({}, state, {
                        auth: true,
                        iduser: action.data.iduser,

                    });
                } else {
                    return Object.assign({}, state, {
                        auth: false,
                        error_msgl: action.data.message
                    })
                }
            }
        case LOGOUT:
            {
                return Object.assign({}, state, {
                    name: "",
                    email: "",
                    pw: "",
                    auth: action.auth
                });
            }
        case FETCH_USERS:
            {
                return Object.assign({}, state, {
                    users: action.data
                })
            }
        case FAILED:
            {
                return Object.assign({}, state, {
                    error_msg: action.data.error_msg
                });
            }
        default:
            return state;
    }
}
export default handleReg