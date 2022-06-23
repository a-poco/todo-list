const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')

const db = new sqlite3.Database('./server/todos.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.err(`Cannot start database ${err.message}`)
})


// let sql = `CREATE TABLE users (
// 	userId integer PRIMARY KEY,
//   userName text NOT NULL)`;
//   db.run(sql)

// let sql = `CREATE TABLE todoLists (
//   todoListId INTEGER PRIMARY KEY,
//   TodoListName TEXT   NOT NULL,
//   userId     INTEGER NOT NULL,
//   FOREIGN KEY (userId)
//      REFERENCES users (userId))`;
//      db.run(sql);

// let sql = `CREATE TABLE todos (
//   todoId INTEGER PRIMARY KEY,
//   title TEXT   NOT NULL,
//   description TEXT,
//   todoListId   INTEGER NOT NULL,
//   FOREIGN KEY (todoListId)
//      REFERENCES todoLists (todoListId))`;
//      db.run(sql);


// Drop table
// db.run("DROP TABLE users")


//Insert data into table
// let sql = `INSERT INTO todos(title, description, todoListId ) VALUES (?, ?, ?)`
// db.run(sql, ["", "Ajax, toilet paper, soap", 1], (err) => {
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


app.get("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM todoLists join todos on todos.todoListId = todoLists.todoListId WHERE userId = ${id}`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json("error");
    return res.status(200).json(rows);
  })
});

app.get("/api/todos", async (req, res) => {
  const sql = `SELECT * FROM todos`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json("error");
    return res.status(200).json(rows);
  })
});


const getuserId = async (userName) => {
  const sql_get = `SELECT * FROM users where userName = '${userName}'`;

  const getUserRows = () => (new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(sql_get, [], (err, rows) => {
        if (err)
          reject(err)
        resolve(rows)
      })
    });
  }))
  
  return getUserRows().then(result => {
    if (result.length > 0) {
      return result[0].userId
    }
  })
}

app.post("/api/users", bodyParser.json(), async (req, res) => {
  const request = await req.body
  console.log(request);
  if (!request ||
    !request.userName) {
    return res.status(400).json({ "error": "Cannot be null" });
  }

  let userId = await getuserId(request.userName);

  if (!userId) {
    const sql = `INSERT INTO users(userName) VALUES (?)`;
    db.run(sql, [
      request.userName,
    ], (err) => {
      if (err) return res.status(500).json({ "error": err.message });
    })
  }

  userId = await getuserId(request.userName)
  return res.status(202).json({ "userId": userId });
});



app.post("/api/todos", bodyParser.json(), async (req, res) => {
  const request = await req.body
  if (!request ||
    !request.title) {
    return res.status(400).json({ "error": "Cannot be null" });
  }
  const sql = `INSERT INTO todos(title,description) VALUES (?,?)`;
  db.run(sql, [
    request.title,
    request.description,
  ], (err) => {
    if (err) return res.status(500).json({ "error": err.message });
  })
  return res.status(202).send();
});


app.delete("/api/todos/:id", async (req, res) => {
  const sql = `DELETE FROM todos WHERE id = (?)`;
  db.run(sql, [req.params.id], (err) => {
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