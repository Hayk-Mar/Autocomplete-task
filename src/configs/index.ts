const config = {
  randomWordsApi: "https://random-word-api.vercel.app/api?words=500&alphabetize=true",
  localJsonApi: "words.json", // Local API - Recommended. 
  getFromLocalApi: true // If you get words from the random-word-api.vercel.app API, each request will return new random words, because of this, the expected result of the work may be incorrect
};

export const wordsApiUrl = config.getFromLocalApi ? config.localJsonApi : config.randomWordsApi;