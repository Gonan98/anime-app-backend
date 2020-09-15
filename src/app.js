const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Settings
app.use(morgan('dev'));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));

// Routes
app.use(require('./routes/anime.routes'));
app.use(require('./routes/auth.routes'));

module.exports = app;