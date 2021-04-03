const express = require("express"),
  cors = require("cors"),
  morgan = require("morgan"),
  PORT = 3000,
  path = require("path"),
  router = require("./router"),
  app = express();

app.use(morgan('dev')).use(cors()).use(express.json());
app.use('/app', router);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
