require('dotenv').config()
import express from 'express';

const app = express();

const port = process.env.PORT

app.get('/', (req, res) => {
    return res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});