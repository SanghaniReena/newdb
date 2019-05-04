import { ADD_CARD, FAILED, ARCHIVE_CARD, SENDTB_CARD, FETCH_CARD, EDITD_CARD, ADD_COMMENT, FETCH_CARD_DETAILS, ADD_DESC, FETCH_CARD_COMMENTS, EDIT_DESC } from "../action/CardsAction"
const INITIAL_STATE = {
    cards: [],
    cardDetails: [],
    cardComment: [],
    archived: []
}
const handleCards = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_CARD:
            {
                return Object.assign({}, state, { cards: action.data })
            }

        case ADD_CARD:
            {
                const newdata = state.cards.concat(action.data[0]);
                console.log(newdata)
                return Object.assign({}, state, { cards: newdata })

            }
        case ARCHIVE_CARD:
            {
                debugger;
                var index;
                for (let i = 0; i < state.cards.length; i++) {
                    if (state.cards[i].idcards === action.data[0].idcards) {
                        index = i
                    }
                }
                let newc = state.cards
                newc.splice(index, 1, action.data[0])
                return Object.assign({}, state, { cards: newc })

            }
        case SENDTB_CARD:
            {
                var ind
                for (let i = 0; i < state.cards.length; i++) {
                    if (state.cards[i].idcards === action.data[0].idcards) {
                        ind = i
                    }
                }
                let newc = state.cards
                newc.splice(ind, 1, action.data[0])
                return Object.assign({}, state, { cards: newc })

            }
        case EDITD_CARD:
            {
                debugger
                console.log(action.data);
                console.log(state.cards)
                for (let i = 0; i < state.cards.length; i++) {
                    if (state.cards[i].idcards === action.data[0].idcards) {
                        index = i
                    }
                }
                let newc = state.cards
                newc.splice(index, 1)
                const newData = state.cards.concat(action.data[0]);
                return Object.assign({}, state, { cards: newData })

                // break;
            }
        case ADD_COMMENT:
            {
                const newdata = state.cardComment.concat(action.data[0]);
                return Object.assign({}, state, { cardComment: newdata })
            }
        case ADD_DESC:
            {
                const newdata = state.cardDetails.concat(action.data);
                return Object.assign({}, state, { cardDetails: newdata })
            }
        case EDIT_DESC:
            {
                for (let i = 0; i < state.cardDetails.length; i++) {
                    if (state.cardDetails[i].idcards === action.data[0].idcards) {
                        index = i
                    }
                }
                let newc = state.cardDetails
                newc.splice(index, 1)
                const newData = state.cardDetails.concat(action.data[0]);
                return Object.assign({}, state, { cardDetails: newData })

               
            }
        // case DELETE_CARD:{

        // }
        case FETCH_CARD_DETAILS:
            {
                return Object.assign({}, state, { cardDetails: action.data })
            }
        case FETCH_CARD_COMMENTS:
            {
                debugger
                return Object.assign({}, state, { cardComment: action.data })
            }
        case FAILED:
            {
                return Object.assign({}, state, { error_msg: action.data.error_msg });
            }

        default:
            return state;
    }
}
export default handleCards