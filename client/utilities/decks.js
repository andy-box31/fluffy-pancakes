export default [
  'transformers', 
  'dinosaurs'
]

/*
  Each deck represents a JSON object at /data/ and must include an "info" object and a "cards" array of card objects.
  all members of the ifo and card objects are required as in the current examples and the info.title should math the 
  file name.
  A card should be series of attributes and their values should corrispond to the competeOn array values in the info object.
  Cards should also have a Name attribute and an Image attribute. 
  
example
  info : {
    "competeOn": <array of attributes that corrispond tot he competing attributes on the cards >,
    "backgroundImage": <greyscale image used as background during a battle>
    "title": <string that matches file name>
  }

  card : {
    attr1: 10,
    attr2: 34,
    attr3: 24,
    Name: <name of card subject>,
    Type: <type of card subject>,
    Image: <image of card subject>
  }
  */