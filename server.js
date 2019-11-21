var express = require('express');
var app = express();
var fs = require('fs');


var stringifyFile;

app.get('/getNote', function (req, res) {
    console.log('Otrzymałem żądanie GET');

    fs.readFile('./test.json', 'utf8', function(err, data) {
        if (err) throw err;
        stringifyFile = data;
        res.send(data);
    });
});

app.post('/updateNote/:note', function (req, res) {
    console.log('Otrzymałem żądanie POST');
    stringifyFile = req.params.note + '\n<br>\n' + new Date();
    fs.writeFile('./test.json', stringifyFile, function(err) {
        if (err) throw err;
        console.log('file test.json updated');
    });
    res.send('Json updated!');
});

app.get('/', function (req, res) {
    res.send('Helloł world!<br><a href="/getNote">Get note</a>');
});

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});

app.listen(3000, function() {
    console.log('Aplikacja nasłuchuje na porcie 3000');
});