const language = require('@google-cloud/language');
var fs = require('fs');

const credentials_config = {
    projectId: "projectId",
    keyFilename: "google_application_cred.json"
};

// Instantiates a client
const client = new language.LanguageServiceClient(credentials_config);

function sentimentAnalysis (data) {
return new Promise((resolve,reject) => {

const document = {
    content: data,
    type: 'PLAIN_TEXT',
};

// Detects the sentiment of the text
client
  .analyzeSentiment({document: document})
  .then(results => {
    const sentiment = results[0].documentSentiment;
    var toSend = {
        Score: sentiment.score,
        Magnitude: sentiment.magnitude
    }
    resolve(toSend)
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
});
}

module.exports = {
    sentimentAnalysis
}