const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
  console.log('server done running on port 3000');
});

app.get('/url', (req, res, next) => {
  res.json('./cactusTaxonomy.json');
});
