import { ADD_CARD, FAILED, FETCH_CARD, EDITD_CARD } from "../action/CardsAction"
const INITIAL_STATE = {
    cards: []
}
const handleCards = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_CARD:
            {
                return Object.assign({}, state, { cards: action.data })
            }

        case ADD_CARD:
            {
                const newdata = state.cards.concat(action.data);
                return Object.assign({}, state, { cards: newdata })

            }
        case EDITD_CARD:
            {

                let idlists = parseInt(action.data.idlists, 10);
                return Object.assign({}, state, {
                    cards: state.cards.map(cards => {
                        return cards.idlists === idlists ? action.data : cards;
                    })
                });
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