require('dotenv').config()
require('./models/dbinit');

import express from 'express';
import bodyParser from 'body-parser'
import patientSignup from './routes/patientSignup'
import adminRouter from './routes/admin'

const app = express();

const port = process.env.PORT

app.use('/admin',adminRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/patientSignup', patientSignup);
app.get('/', (req, res) => {
    return res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});