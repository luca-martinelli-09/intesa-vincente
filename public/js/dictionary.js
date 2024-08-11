let dictionary = [];
wordCloud.forEach((word) => {
  for (let num = 0; num < word.p; num++) {
    dictionary.push(word);
  }
});

let displayedWords = [];

function randomWord(w = 1) {
  const filteredDictionary = dictionary.filter((word) => word.w === w);

  let randomNum = Math.floor(Math.random() * filteredDictionary.length);
  let word = filteredDictionary[randomNum].word;

  while (displayedWords.includes(word)) {
    randomNum = Math.floor(Math.random() * filteredDictionary.length);
    word = filteredDictionary[randomNum].word;
  }

  return word;
}
