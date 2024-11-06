const express = require('express');
const path = require('path');
const cors = require('cors');

const routes = require('./api/routes/index');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}.`);
});

module.exports = app;
