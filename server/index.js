const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = 3000;
const path = require('path');
const router = require('./router');

const app = express();
const axios = require('axios');

app.use(morgan('dev')).use(cors()).use(express.json());
app.use('/app', router);
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
