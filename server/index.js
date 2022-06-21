const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const sqlite3 =require('sqlite3').verbose();
const bodyParser = require('body-parser')

const db = new sqlite3.Database('./server/todos.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.err(`Cannot start database ${err.message}`)
})


//Create table
// let sql = `CREATE TABLE todos(id INTEGER PRIMARY KEY, tittle,description)`
// db.run(sql)

//Insert data into table
// let sql = `INSERT INTO todos(tittle,description) VALUES (?,?)`
// db.run(sql, ["swimn", "Go out to the beach for a nice swimn"], (err) => {
//   if (err) return console.err(`Cannot start database ${err.message}`)
// })

//Query database 
// let sql = `SELECT * FROM todos`;
// db.all(sql, [], (err, rows) => {
//   if (err) return console.err(`Cannot read database ${err.message}`)
//   rows.forEach((row) => {
//      console.log(row)
//   });
// })



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

app.get("/api/todos", async (req, res) => {
  const sql = `SELECT * FROM todos`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json("error");
    return res.status(200).json(rows);
  })
});

app.post("/api/todos", bodyParser.json(), async (req, res) => {
  const request = await req.body
  if (!request ||
    !request.tittle) {
    return res.status(400).json({ "error": "Cannot be null" });
  }
  const sql = `INSERT INTO todos(tittle,description) VALUES (?,?)`;
  db.run(sql, [
    request.tittle,
    request.description,
  ], (err) => {
    if (err) return res.status(500).json({ "error": err.message });
  })
  return res.status(202).send();
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});