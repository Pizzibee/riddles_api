const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

//body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes configuration
app.get('/', (req, res) => {
  res.send({ info: 'API for Riddles made by Sushil Ghambir' });
});
var routes = require('./routes/apiRoutes'); //importing apiRoutes
routes(app); //register the route

//server launch
app.listen(port, () =>{
  console.log(`Api running on port ${port}`);
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
