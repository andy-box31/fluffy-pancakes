import { ACTIONS, PLAY_MODE, PLAYERS, GAME_STATE, GAME_LEVEL } from '../utilities/constants'
import shuffle from '../utilities/shuffle'

const initialState = {
  cards: [],
  deckInfo: {competeOn: []},
  playmode: PLAY_MODE.VS_COMPUTER,
  activePlayer: null,
  winner: null,
  gameState: GAME_STATE.PRE_GAME,
  gameLevel: GAME_LEVEL.MEDIUM
}

const {SET_CARDS, SET_INFO, DEAL_CARDS, GO_BATTLE, SET_PLAY_MODE, SET_GAME_LEVEL} = ACTIONS

function rootReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case (SET_CARDS): // cards, activePlayer
      newState = {
        ...state,
        cards: action.payload,
        activePlayer: PLAYERS.PLAYER_1
      }
      return newState
    case (SET_INFO): // deckInfo
      newState = {
        ...state,
        deckInfo: action.payload
      }
      return newState
    case (SET_PLAY_MODE): // playmode
        newState = {
          ...state,
          playmode: action.payload
        }
        return newState
    case (SET_GAME_LEVEL): // gameLevel
      newState = {
        ...state,
        gameLevel: action.payload
      }
      return newState
    case (DEAL_CARDS): // cards, hand1Cards, hand2Cards, theMiddle, winner, gameState
      const shuffled = shuffle(state.cards)
      const mid = Math.floor(shuffled.length/2)
      newState = {
        ...state,
        hand1Cards: shuffled.slice(0, mid),
        hand2Cards: shuffled.slice(mid, shuffled.length),
        theMiddle: [],
        winner: null,
        gameState: GAME_STATE.DURING_GAME
      }
      return newState
    case (GO_BATTLE): // hand1Cards, hand2Cards, theMiddle, winner, gameState activePlayer,
      let newWinner = state.winner
      let newMiddle = state.theMiddle
      let newHand1 = state.hand1Cards.slice()
      let newHand2 = state.hand2Cards.slice()
      let newActivePlayer = state.activePlayer
      let newGameState = state.gameState
      const card1 = newHand1.shift()
      const card2 = newHand2.shift()
      if(!card1[action.payload] || !card2[action.payload]) {
        // error
        return state
      }
      if (card1[action.payload] > card2[action.payload]){
        newHand1.push(card1)
        newHand1.push(card2)
        newHand1.push(...newMiddle)
        newMiddle = []
        newActivePlayer = PLAYERS.PLAYER_1
      } else if (card1[action.payload] === card2[action.payload]){
        newMiddle.push(card1)
        newMiddle.push(card2)
      } else {
        newHand2.push(card1)
        newHand2.push(card2)
        newHand2.push(...newMiddle)
        newMiddle = []
        newActivePlayer = PLAYERS.PLAYER_2
      }
      if (newHand1.length === 0) {
        newWinner = PLAYERS.PLAYER_2
        newGameState = GAME_STATE.POST_GAME
      } else if (newHand2.length === 0) {
        newWinner = PLAYERS.PLAYER_1
        newGameState = GAME_STATE.POST_GAME
      }
      newState = {
        ...state,
        hand1Cards: newHand1,
        hand2Cards: newHand2,
        theMiddle: newMiddle,
        activePlayer: newActivePlayer,
        winner: newWinner,
        gameState: newGameState

      }
      return newState
    default:
  }
  return state
}

export default rootReducer
