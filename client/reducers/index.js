import { ACTIONS, PLAY_MODE, PLAYERS } from '../utilities/constants'
import shuffle from '../utilities/shuffle'

const initialState = {
  cards: [],
  playmode: PLAY_MODE.VS_LOCAL,
  activePlayer: PLAYERS.PLAYER_1,
  winner: null
}

const {SET_CARDS, SHUFFLE_CARDS, DEAL_CARDS, GO_BATTLE, SET_PLAY_MODE} = ACTIONS

function rootReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case (SET_CARDS):
      newState = {
        ...state,
        cards: action.payload
      }
      return newState
      break
    case (SHUFFLE_CARDS):
        // shuffle the cards
        newState = {
          ...state,
          cards: action.payload,
          shuffledCards: shuffle(action.payload)
        }
        return newState
        break
    case (DEAL_CARDS):
      const shuffled = shuffle(action.payload)
      const mid = Math.floor(shuffled.length/2)
      newState = {
        ...state,
        cards: action.payload,
        hand1Cards: shuffled.slice(0, mid),
        hand2Cards: shuffled.slice(mid+1, shuffled.length)
      }
      return newState
      break
    case (SET_PLAY_MODE):
        newState = {
          ...state,
          playmode: action.payload
        }
        return newState
        break
    case (GO_BATTLE):
      console.log('battle')
      let newWinner = state.winner
      let newHand1 = state.hand1Cards.slice()
      let newHand2 = state.hand2Cards.slice()
      let newActivePlayer = state.activePlayer
      const card1 = newHand1.shift()
      const card2 = newHand2.shift()
      console.log('checking payload', !card1[action.payload], !card2[action.payload])
      console.log('blah payload', newHand1.length, card1[action.payload], newHand2.length, card2[action.payload])
      if(!card1[action.payload] || !card2[action.payload]) {
        // error
        console.log('error payload', card1, card2)
        return state
      }
      if (card1[action.payload] > card2[action.payload]){
        newHand1.push(card1)
        newHand1.push(card2)
        newActivePlayer = PLAYERS.PLAYER_1
      } else {
        newHand2.push(card1)
        newHand2.push(card2)
        newActivePlayer = PLAYERS.PLAYER_2
      }
      console.log('check winner', newHand1.length, newHand2.length)
      if (newHand1.length === 0) {
        newWinner = PLAYERS.PLAYER_2
      } else if (newHand2.length === 0) {
        newWinner = PLAYERS.PLAYER_1

      }
      newState = {
        ...state,
        hand1Cards: newHand1,
        hand2Cards: newHand2,
        activePlayer: newActivePlayer,
        winner: newWinner

      }
      return newState
      break
    default:
  }
  return state
}

export default rootReducer
