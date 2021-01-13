const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { response } = require("express");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'CRUDdatabase'
});
app.get('/', (req , res) => 
{
res.send("Hello")
});
app.post("/create", (req, res) => {
  res.send("Get Vreate");
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age , country, position, wage) VALUES (?,?,?,?, ?)",
    [name, age, country, position,wage ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //res.send("Values Inserted");
      }
    }
  );
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/update/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM employees where id = "+id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
      console.log(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;  
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  console.log(id + name + age );
  const updateQuery = "UPDATE employees SET name = '"+name+"' , age = '"+age+"' , country = '"+country+"', position = '"+position+"', wage = '"+wage+"' WHERE id = '"+id+"'";
  console.log(updateQuery);
  db.query(updateQuery,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  //res.send(id);
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3009, () => {
  console.log("Yey, your server is running on port 3009");
});