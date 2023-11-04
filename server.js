const express = require('express');
const db = require('./config/connection');
const routes = require('./routes') 

const PORT = 3001; //since we're not deploying to heroku, we're just using a port number.
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes); 

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });