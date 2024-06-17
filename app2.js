const express = require('express');
const bodyParser = require('body-parser'); // Needed to parse body parts of HTTP Posts
const app = express();

/** Decode Form URL Encoded data */
app.use(bodyParser.urlencoded({extended: true}));;

/** Show page with a form */
app.get('/', (req, res, next) => {
  res.send(`<form method="POST" action="/">
  <input type="text" name="p1" placeholder="parameter1">
  <input type="submit">
</form>`);
});

/** Process POST request */
app.post('/', (req, res, next) => {
  res.send(JSON.stringify(req.body));
});

/** Run the app */
app.listen(8081);