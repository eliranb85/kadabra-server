const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.post('/save-user', (req, res) => {
    console.log(req.body);
  const user = req.body;
  const jsonData = JSON.stringify(user, null, 2);

  fs.writeFileSync('users.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});