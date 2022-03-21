const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");


const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

var DatabaseConnectionConfig={
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flower_shop'
}


var db=mysql.createConnection(DatabaseConnectionConfig);

db.connect(function (err) {
  if(err){
      console.log('Error connecting to Db');
  }
  else{
      console.log('Connection established');
  }
}
);

app.post("/register", (req, res) => {

  const userName = req.body.userName;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;


    db.query(
      "INSERT INTO users (userName, name, email, password, phone, address) VALUES (?,?,?,?,?,?)",
      [userName, name, email, password, phone, address],
      (err, result) => {
        console.log(err);
      }
    );
  });




// app.post("/create", (req, res) => {

//     const name = req.body.name;
//     const image = req.body.image;
//     const description = req.body.description;
//     const Price = req.body.Price;

//     db.query(
//       "INSERT INTO flowers (name, image, description, Price) VALUES (?,?,?,?)",
//       [name, image, description, Price],
//       (err, result) => {
//         console.log(err);
//       }
//     );

    app.listen(port, () => {
  console.log("Server is Running at", port);
});
