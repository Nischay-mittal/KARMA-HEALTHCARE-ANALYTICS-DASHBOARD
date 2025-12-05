// backend/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const apiRoutes = require('./routes/api');
const errorHandler = require('./middlewares/errorhandler');

const app = express();
const PORT = 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api', apiRoutes);


app.use(errorHandler);

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));

