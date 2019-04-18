import * as authService from "../service/authService"

export const Add_TBOARD = "ADD_TBOARD";
export const FETCH_TBOARD = "FETCH_TBOARD";
export const EDIT_TBOARD = "EDIT_TBOARD";
export const FAILED = "FAILED";
export const FETCH_IBOARD = "FETCH_IBOARD";

export const AddTBoard = (data) => {
    return (dispatch) => {
        authService.teamboards(data)
            .then((response) => {

                if (response.status === 200) {

                    dispatch({
                        type: Add_TBOARD,
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
export const EditTBoard = (idboards, idteams) => {
    debugger
    return (dispatch) => {
        authService.editteamboards(idboards, idteams)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: EDIT_TBOARD,
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
export const FetchTBoard = (id) => {

    return (dispatch) => {
        authService.teamboardsname(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_TBOARD,
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

export const FetchiBoard = (iduser, idteam) => {

    return (dispatch) => {
        authService.tboardname(iduser, idteam)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_IBOARD,
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
