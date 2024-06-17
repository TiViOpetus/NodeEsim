// WEB SERVER FOR DEMONSTRATING URL ROUTING AND PARAMETERS IN URLS
// ===============================================================

// LIBRARIES AND MODULES
// ---------------------

const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser'); // Needed to parse body parts of HTTP Posts

// EXPRESS APP SETTINGS
// --------------------

const app = express();
const PORT = process.env.PORT || 8080;

// Se paths for views
app.use(express.static('public'));
app.set('views', './views');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Body-parser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// URL ROUTING
// -----------

// The home page
app.get('/', (req, res) => {
  res.render('index');
});

// 1st Example using query
app.get('/esim1', (req, res) => {
  // Read parameters used in the query
  let parameter1 = req.query.p1;
  let parameter2 = req.query.p2;

  // Build data object for the handlebar page
  let ex1Data = {
    param1: parameter1,
    param2: parameter2,
  };

  res.render('esim1', ex1Data);
});

// 2nd Example using URL parameter
app.get('/esim2/:p1', (req, res) => {
  // Read parameter from URL
  let parameter1 = req.params.p1;

  // Build data object for the handlebar page
  let ex2Data = {
    param1: parameter1,
  };

  res.render('esim2', ex2Data);
});

// 3rd Example using post method and form data
app.get('/form', (req, res, next) => {
  res.send(`<form method="POST" action="/">
    <input type="text" name="p1" placeholder="parameter1">
    <input type="submit">
  </form>`);
});

app.post('/', (req, res, next) => {
  res.send(JSON.stringify(req.body));
  console.log(req.body.p1)
});

// START THE LISTENER
app.listen(PORT);
console.log('Server started and it will listen TCP port', PORT);
