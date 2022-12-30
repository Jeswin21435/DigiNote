//Imports
const apiRegister = require('./exports/api-register.js');
const apiAuthenticate = require('./exports/api-authenticate.js');
const apiGetUsername = require('./exports/api-get-username');

// del me afterwards

//Public Variables
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const generateToken = require('random-number'); // Takes in an object as an argument, ex: let options = { min: 1, max: 5 }
const otpGenerator = require('otp-generator');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Jeswin:Jeswin2009@cluster0.5nwhj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use('/', express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/user');
});
app.get('/api/register', (req, res) => {
    apiRegister(req, res, generateToken, client);
});
app.get('/api/authenticate', (req, res) => {
    apiAuthenticate(req, res, client);
});
app.post('/api/get-username', (req, res) => {
    apiGetUsername(req, res, client);
});
app.post('/api/get-notes', (req, res) => {
    const tokenSTRING = req.body.token;
    const token = parseInt(tokenSTRING);

    client.connect(async err => {
        const collectionAcc = client.db('DigiNote').collection('accounts');
        const doc = await collectionAcc.findOne({
            accountToken: token
        })
        if(!doc) {
            return res.send({ notesArr: null });
        }
        const collectionNotes = client.db('DigiNote').collection('notes');
        const notesArr = await collectionNotes.find().toArray();
        res.send({ notesArr: notesArr });
    })
});

app.listen(PORT, console.log('The server is lit up on port: ' + '-->' + PORT + '<--'));