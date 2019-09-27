export const sortAlphabetical = (a,b) => {
  return (a.Name > b.Name) ? 1 : - 1
}

export const sortAlphabeticalInverse = (a,b) => {
  return (a.Name < b.Name) ? 1 : - 1
}
