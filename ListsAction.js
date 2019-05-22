import * as authService from "../service/authService"

export const ADD_LIST = "ADD_LIST";
export const FETCH_LIST = "FETCH_LIST";
export const FAILED = "FAILED";
export const FETCH_ALL_LIST="FETCH_ALL_LIST"
export const AddList = (data) => {

    return (dispatch) => {
        authService.lists(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_LIST,
                        data: response.data,
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            })
    }
}
export const FetchList = (id) => {

    return (dispatch) => {
        authService.listname(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_LIST,
                        data: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            })
    }
}
export const FetchAllList = (id) => {
debugger
    return (dispatch) => {
        authService.alllistname(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_ALL_LIST,
                        data: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            })
    }
}
