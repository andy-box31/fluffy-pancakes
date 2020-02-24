import { GAME_LEVEL } from './constants'

class battleEngine {
  constructor (cards = [], info = {}, level = GAME_LEVEL.MEDIUM) {
    this.attributes = this.learnFrom(cards, info.competeOn)
    this.level = level
    this.competingAttributes = info.competeOn
  }

  learnFrom (cards, info) {
    let attributes = {}
    info.forEach((attribute) => {
      attributes[attribute] = {
        high: null,
        low: null,
        average: null,
        median: null,
        all: []
      }
    })
    cards.forEach((card) => {
      info.forEach((attribute) => {
        let value = card[attribute]
        if (attributes[attribute].high === null) { // initially set
          attributes[attribute].high = value
          attributes[attribute].low = value
          attributes[attribute].average = value / cards.length
          attributes[attribute].all.push(value)
        } else {
          attributes[attribute].high = value > attributes[attribute].high ? value : attributes[attribute].high
          attributes[attribute].low = value < attributes[attribute].low ? value : attributes[attribute].low
          attributes[attribute].average = attributes[attribute].average + value / cards.length
          attributes[attribute].all.push(value)
        }
      })
      // order all values and calculate median
      for (const prop in attributes) {
        const current = attributes[prop]
        current.all.sort(this.sortByValue)
        current.median = (current.all.length % 2 === 0) ? current.all[Math.floor(current.all.length / 2) - 1] : current.all[Math.floor(current.all.length / 2)]
      }
    })
    return attributes
  }

  sortByValue (a, b) {
    return a - b
  }

  getPercentageInRange (value, low, high) {
    let range = high - low
    let relativeValue = value - low
    return relativeValue / range * 100
  }

  selectAttribute (card) {
    const keys = this.competingAttributes // []
    const randomIndex = Math.floor(Math.random() * keys.length)
    let best = { key: null, value: 0 }
    switch (this.level) {
      case (GAME_LEVEL.EASY):
      case (GAME_LEVEL.RANDOM):
        return keys[randomIndex]
      case (GAME_LEVEL.GT_AVERAGE):
        for (let i = 0; i < keys.length; i++) {
          const current = this.attributes[keys[i]]
          let val = this.getPercentageInRange(card[keys[i]], current.low, current.high)
          let average = this.getPercentageInRange(current.average, current.low, current.high)
          if (val > average) {
            return keys[i]
          }
        }
        break
      case (GAME_LEVEL.MEDIUM):
      case (GAME_LEVEL.GT_MEDIAN):
        for (let i = 0; i < keys.length; i++) {
          const current = this.attributes[keys[i]]
          let val = this.getPercentageInRange(card[keys[i]], current.low, current.high)
          let median = this.getPercentageInRange(current.median, current.low, current.high)
          if (val > median) {
            return keys[i]
          }
        }
        break
      case (GAME_LEVEL.HARD):
      case (GAME_LEVEL.BEST_ON_CARD):
        for (let i = 0; i < keys.length; i++) {
          const current = this.attributes[keys[i]]
          let val = this.getPercentageInRange(card[keys[i]], current.low, current.high)
          if (val > best.value) {
            best = { key: keys[i], value: val }
          }
        }
        return best.key
    }
    return keys[randomIndex]
  }
}

export default battleEngine
