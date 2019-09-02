import {GAME_LEVEL} from './constants'

class battleEngine {
  constructor (cards = [], info = {}, level = GAME_LEVEL.EASY) {
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
          attributes[attribute].average = value/cards.length
          attributes[attribute].all.push(value)
        } else {
          attributes[attribute].high = value > attributes[attribute].high ? value : attributes[attribute].high
          attributes[attribute].low = value < attributes[attribute].low ? value : attributes[attribute].low
          attributes[attribute].average = attributes[attribute].average + value/cards.length
          attributes[attribute].all.push(value)
        }
      })
      // order all values and calculate median
      for(const prop in attributes) {
        const current = attributes[prop]
        current.all.sort(this.sortByValue)
        current.median = (current.all.length%2 === 0) ? current.all[Math.floor(current.all.length/2)-1] : current.all[Math.floor(current.all.length/2)]
      }
    })
    console.log(attributes)
    return attributes
  }

  sortByValue(a, b) {
    return a - b
  }

  selectAttribute (card) {
    const keys = this.competingAttributes
    const index = Math.floor(Math.random()*keys.length)
    switch (this.level) {
      case (GAME_LEVEL.EASY):
          return keys[index]
      case (GAME_LEVEL.MEDIUM):
        // Know the range for each attr lowest->highest
        // Find current attr as % value within range
        // pick highest % attr
        let attr
       // for
      case (GAME_LEVEL.HARD):
        // Know range and average score across Deck
        // Find current attr as % in range aswell as relative to average score maybe range between average and top?
        // pick best
        return keys[index]
    }
  }
}

export default battleEngine