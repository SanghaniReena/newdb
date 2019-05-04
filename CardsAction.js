import * as authService from "../service/authService"
export const ADD_CARD = "ADD_CARD";
export const FETCH_CARD = "FETCH_CARD";
export const FAILED = "FAILED";
export const EDITD_CARD = "EDITD_CARD";
export const ADD_COMMENT = "ADD_COMMENT";
export const FETCH_CARD_DETAILS = "FETCH_CARD_DETAILS";
export const ADD_DESC = "ADD_DESC";
export const FETCH_CARD_COMMENTS = "FETCH_CARD_COMMENTS";
export const EDIT_DESC = "EDIT_DESC";
export const DELETE_CARD = "DELETE_CARD";
export const ARCHIVE_CARD = "ARCHIVE_CARD"
export const SENDTB_CARD="SENDTB_CARD"
export const AddCard = (data) => {

    return (dispatch) => {
        authService.cards(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_CARD,
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
export const DeleteCard = (id) => {
    debugger
    return (dispatch) => {
        authService.deletecards(id)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: DELETE_CARD,
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
export const FetchCard = (id) => {

    return (dispatch) => {
        authService.cardsname(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_CARD,
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
export const DEditCard = (idlists, idcards) => {
    debugger
    return (dispatch) => {
        authService.editdcardsname(idlists, idcards)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: EDITD_CARD,
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
export const AddComment = (data) => {

    return (dispatch) => {
        authService.AddComment(data)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: ADD_COMMENT,
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

export const AddDesc = (data) => {
    return (dispatch) => {
        authService.AddDesc(data)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: ADD_DESC,
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
export const EditDesc = (data) => {
    debugger
    return (dispatch) => {
        authService.EditDesc(data)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: EDIT_DESC,
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

export const FetchCardDetails = (id) => {

    return (dispatch) => {
        
        authService.fetchCardDetails(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_CARD_DETAILS,
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
export const FetchCardComments = (id) => {
    debugger
    return (dispatch) => {
        authService.fetchCardComments(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_CARD_COMMENTS,
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
export const ArchiveCard = (id) => {
    debugger
    return (dispatch) => {

        authService.archiveCard(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: ARCHIVE_CARD,
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
export const SendtbCard = (id) => {
    debugger
    return (dispatch) => {

        authService.stbCard(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: SENDTB_CARD,
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
