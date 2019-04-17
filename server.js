const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

const connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME
});

const getUsers = function(req, res) {
  connection.query('select username from users', function(err, users) {
    if (err) console.log(err);
    res.send(users);
  });
};

const addUser = function(req, res) {
  const name = req.body.username;
  const content = { name };
  connection.query('insert into users set ?', content, function(err, result) {
    if (err) console.log(err);
    console.log('in add user');
    getUsers(req, res);
  });
};

app.use(express.static(__dirname + '/react_dashboard/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/getusers', getUsers);
app.post('/register', addUser);

app.listen(port, () => {
  console.log(`server listens on port ${port}`);
});
