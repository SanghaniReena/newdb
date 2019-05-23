import * as authService from "../service/authService"

export const Add_BOARD = "ADD_BOARD";
export const FETCH_BOARD = "FETCH_BOARD";
export const FAILED = "FAILED";
export const FETCH_ALL_BOARD="FETCH_ALL_BOARD";

export const AddBoard = (data,history) => {
    
    return (dispatch) => {
        authService.boards(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: Add_BOARD,
                        data: response.data,
                    });
                   
                   
                    if(response.data[0].idboards!==undefined){
                        history.push("/board/" + response.data[0].idboards)}
                }
               
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            })
           
    }
}
export const FetchBoard = (id) => {

    return (dispatch) => {
        authService.boardsname(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_BOARD,
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
export const FetchAllBoard = (id) => {

    return (dispatch) => {
        authService.allboards(id)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: FETCH_ALL_BOARD,
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
