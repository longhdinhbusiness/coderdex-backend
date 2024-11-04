const express = require('express');
const cors = require('cors');
const routes = require('./api/routes');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

module.exports = app;
