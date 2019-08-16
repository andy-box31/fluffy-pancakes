export default function shuffle (ar) {
  let result = ar.slice()
  let current = result.length
  let temp, rand
  while (0 !== current) {
    rand = Math.floor(Math.random() * current)
    current -= 1
    
    temp = result[current]
    result[current] = result[rand]
    result[rand] = temp
  }
  return result
}
