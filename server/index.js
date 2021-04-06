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

app.get('/yelp', (req, res) => {
  axios.get('https://api.yelp.com/v3/businesses/search', {
    json: true,
    headers: {
      authorization: 'Bearer FCjYuGUU6sDdV4pbWxqy23I_UsG730pGsK6b5euAEsgmoU6l3UVN2YR5WfIhuiDIZAxfwBxulDU7XUoOGXpbAPb__VPZFuOTo5qY4eNNSsf8LpPqe9GiXFp1rFJrYHYx',
    },
  }).then((result) => {
    console.log(result);
    res.send(result);
  });
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
