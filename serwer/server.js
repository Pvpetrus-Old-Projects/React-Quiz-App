import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Server with quizes');
});

app.get('/quizes', (req, res) => {
    fs.readFile('./quizes.json', 'utf8', (err, quizesJson) => {
        if (err) {
            console.log("File read failed in GET /quizes: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /quizes");
        res.send(quizesJson);
    });
});

app.get('/quizes/:index', (req, res) => {
    fs.readFile('./quizes.json', 'utf8', (err, quizesJson) => {
        if (err) {
            console.log("File read failed in GET /quizes/" + req.params.index + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var quizes = JSON.parse(quizesJson);
        var quiz = quizes.find(quiztmp => quiztmp.index_nr == req.params.index);
        if (!quiz) {
            console.log("Can't find quiz with index: " + req.params.index);
            res.status(500).send('Cant find quiz with index: ' + req.params.index);
            return;
        }
        var quizJSON = JSON.stringify(quiz);
        console.log("GET /quizes/" + req.params.index);
        res.send(quizJSON);
    });
});

app.post('/quizes', (req, res) => {
    fs.readFile('./quizes.json', 'utf8', (err, quizesJson) => {
        if (err) {
            console.log("File read failed in POST /quizes: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var quizes = JSON.parse(quizesJson);
        var quiz = quizes.find(quiztmp => quiztmp.index_nr == req.body.index_nr);
        if (!quiz) {
            quizes.push(req.body);
            var newList = JSON.stringify(quizes);
            fs.writeFile('./quizes.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /quizes: "+ err);
                    res.status(500).send('Error writing file quizes.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file quizes.json and added new quiz with index = " + req.body.index_nr);
                }
            });
        } else {
            console.log("quiz by index = " + req.body.index_nr + " already exists");
            res.status(500).send('quiz by index = ' + req.body.index_nr + ' already exists');
            return;
        }
    });
});

app.put('/quizes/:index', (req, res) => {
    fs.readFile('./quizes.json', 'utf8', (err, quizesJson) => {
        if (err) {
            console.log("File read failed in PUT /quizes/" + req.params.index+": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var quizes = JSON.parse(quizesJson);
        var quizBody = quizes.find(quiztmp => quiztmp.index_nr == req.body.index_nr);
        if (quizBody && quizBody.index_nr != req.params.index) {
            console.log("quiz by index = " + quizBody.index_nr + " already exists");
            res.status(500).send('quiz by index = ' + quizBody.index_nr + ' already exists');
            return;
        }
        var quiz = quizes.find(quiztmp => quiztmp.index_nr == req.params.index);
        if (!quiz) {
            quizes.push(req.body);
            var newList = JSON.stringify(quizes);
            fs.writeFile('./quizes.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /quizes/" + req.params.index+": "+err);
                    res.status(500).send('Error writing file quizes.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file quizes.json and added new quiz with index = " + req.body.index_nr);
                }
            });
        } else {
            for (var i = 0; i < quizes.length; i++) {
                if (quizes[i].index_nr == quiz.index_nr) {
                    quizes[i] = req.body;
                }
            }
            var newList = JSON.stringify(quizes);
            fs.writeFile('./quizes.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /quizes/" + req.params.index+": "+ err);
                    res.status(500).send('Error writing file quizes.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file quizes.json and edit quiz with old index = " + req.params.index);
                }
            });
        }
    });
});

app.delete('/quizes/:index', (req, res) => {
    fs.readFile('./quizes.json', 'utf8', (err, quizesJson) => {
        if (err) {
            console.log("File read failed in DELETE /quizes: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var quizes = JSON.parse(quizesJson);
        var quizIndex = quizes.findIndex(quiztmp => quiztmp.index_nr == req.params.index);
        if (quizIndex != -1) {
            quizes.splice(quizIndex, 1);
            var newList = JSON.stringify(quizes);
            fs.writeFile('./quizes.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /quizes/" + req.params.index+": "+ err);
                    res.status(500).send('Error writing file quizes.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted quiz with index = " + req.params.index);
                }
            });
        } else {
            console.log("quiz by index = " + req.params.index + " does not exists");
            res.status(500).send('quiz by index = ' + req.params.index + ' does not exists');
            return;
        }
    });
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));

//node -r esm server.js