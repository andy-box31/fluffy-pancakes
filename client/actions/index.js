export const THROW_ERROR = 'THROW_ERROR'
export const SET_CARDS = 'SET_CARDS'
export const GET_CARDS = 'GET_CARDS'
export const SHUFFLE_CARDS = 'SHUFFLE_CARDS'
export const DEAL_CARDS = 'DEAL_CARDS'

export const throwError = (payload) => {
  return { type: THROW_ERROR, payload } // -> errorMiddleware
}

export const getCards = () => {
  return { type: GET_CARDS } // -> sagasMiddleware
}

export const setCards = (payload) => {
  return { type: SET_CARDS, payload }
}

export const shuffleCards = (payload) => {
  return { type: SHUFFLE_CARDS, payload }
}

export const dealCards = (payload) => {
  return { type: DEAL_CARDS, payload }
}
