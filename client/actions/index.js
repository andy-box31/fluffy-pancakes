import { ACTIONS } from '../utilities/constants'

const {
  THROW_ERROR,
  SET_CARDS,
  SET_INFO,
  GET_CARDS,
  SHUFFLE_CARDS,
  DEAL_CARDS,
  SHOW_DECK,
  GO_BATTLE,
  SET_PLAY_MODE,
  COMPUTER_TURN,
  SET_GAME_LEVEL
} = ACTIONS

export const throwError = (payload) => {
  return { type: THROW_ERROR, payload } // -> errorMiddleware
}

export const getCards = (payload, callback = () => {}) => {
  return { type: GET_CARDS, payload, callback } // -> sagasMiddleware
}

export const setCards = (payload) => {
  return { type: SET_CARDS, payload }
}

export const setInfo = (payload) => {
  return { type: SET_INFO, payload }
}

export const shuffleCards = (payload) => {
  return { type: SHUFFLE_CARDS, payload }
}

export const dealCards = (payload) => {
  return { type: DEAL_CARDS, payload }
}

export const showDeck = () => {
  return { type: SHOW_DECK }
}

export const goBattle = (payload) => {
  return { type: GO_BATTLE, payload }
}

export const setPlaymode = (payload) => {
  return { type: SET_PLAY_MODE, payload }
}

export const setGameLevel = (payload) => {
  return { type: SET_GAME_LEVEL, payload }
}

export const computerTurn = () => {
  return { type: COMPUTER_TURN }
}
