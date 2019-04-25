import * as authService from "../service/authService"

export const ADD_CARD = "ADD_CARD";
export const FETCH_CARD = "FETCH_CARD";
export const FAILED = "FAILED";
export const EDITD_CARD = "EDITD_CARD";


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
    var idlistsi = parseInt(idlists, 10);
    var idcardsi = parseInt(idcards, 10);

    return (dispatch) => {
        authService.editdcardsname(idlistsi, idcardsi)
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