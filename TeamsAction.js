import * as authService from "../service/authService"
export const ADD_TEAM = "ADD_TEAM";
export const FETCH_TEAM = "FETCH_TEAM";
export const FAILED = "FAILED";

export const AddTeam = (data, history) => {
    const id = localStorage.getItem("iduser")
    return (dispatch) => {
        authService.teams(data)
            .then((response) => {

                if (response.status === 200) {

                    dispatch({
                        type: ADD_TEAM,
                        data: response.data,
                        signup: response.data.signup
                    });
                }
                history.push("/" + id + '/teams')
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }

            })
    }
}
export const FetchTeam = (id) => {
    return (dispatch) => {

        return new Promise((resolve, reject) => {

            authService.teamsname(id)
                .then((response) => {

                    if (response.status === 200) {
                        dispatch({
                            type: FETCH_TEAM,
                            data: response.data
                        });
                    }
                })
                .catch((error) => {
                    if (error) {
                        dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                    }
                })
            resolve()
        })
    }
}
