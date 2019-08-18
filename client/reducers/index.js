import { SHUFFLE_CARDS, SET_CARDS, DEAL_CARDS } from '../actions/index'
import shuffle from '../utilities/shuffle'

const initialState = {
  cards: []
}

function rootReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case (SET_CARDS):
      newState = {cards: action.payload}
      return newState
      break
    case (SHUFFLE_CARDS):
        // shuffle the cards
        newState = {
          cards: action.payload,
          shuffledCards: shuffle(action.payload)
        }
        return newState
        break
    case (DEAL_CARDS):
      const shuffled = shuffle(action.payload)
      const mid = Math.floor(shuffled.length/2)
        newState = {
          cards: action.payload,
          hand1Cards: shuffled.slice(0, mid),
          hand2Cards: shuffled.slice(mid+1, shuffled.length)
        }
        return newState
        break
    default:
  }
  return state;
}

export default rootReducer
