const express = require('express')
const app = express()
const language = require('./sentiment.js')
var bodyParser = require('body-parser');

function runPy (file,uniqueId) {
    return new Promise((success, nosuccess) => {

    const { spawn } = require('child_process');
    const pyprog = spawn('python', [file,uniqueId]);

    pyprog.stdout.on('data', function(data) {

        success(data);
    });

    pyprog.stderr.on('data', (data) => {

        nosuccess(data);
    });
});    
}

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/amazon', (req, res) => {
    runPy('amazon.py',req.body.amazonText).then(function(fromRunpy) {
        sentimentAnalysis(fromRunpy.toString()).then(function (result) {
            res.send(result)    
        });
    });
})

app.post('/imdb', (req, res) => {
    runPy('imdb.py',req.body.imdbText).then(function(fromRunpy) {
        sentimentAnalysis(fromRunpy.toString()).then(function (result) {
            res.send(result)    
        });
    });
});

app.post('/rottenTomatoes', (req, res) => {
    runPy('rottenTomatoes.py',req.body.rottenTomatoesText).then(function(fromRunpy) {
        sentimentAnalysis(fromRunpy.toString()).then(function (result) {
            res.send(result)    
        });
    });
});

function sentimentAnalysis (data) {
    return new Promise((resolve,reject) => {
    language.sentimentAnalysis(data).then(function (result){
        var score = result.Score;
        var magnitude = result.Magnitude;
        var data = "Score: " + score + " <br/> Magnitude: "+magnitude
        console.log(data);
        if(score >= 0.6)
            resolve("<body style='background-color:Green'><h1>It's Amazing!!</h1>");
        else if(score >= 0.2 && score < 0.6)
            resolve("<body style='background-color: #79ff4d'><h1>Looks Good </h1>");
        else if(score >= -0.2 && score < 0.2)
            resolve("<body style='background-color:Yellow'><h1>It's Okay</h1>");
        else if(score >= -0.6 && score < -0.2)
            resolve("<body style='background-color: #ff8566'><h1>Not Advisable</h1>");
        else if(score < -0.6)
            resolve("<body style='background-color:Red'><h1>Quite Pathetic!!</h1>");
    });
});
}

app.listen(3000, () => console.log('Application listening on port 3000!'))