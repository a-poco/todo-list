const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')

const db = new sqlite3.Database('./server/todos.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.err(`Cannot start database ${err.message}`)
})

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/users/:id/todo-list", async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM todoLists WHERE userId = ${id}`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json("error");
    return res.status(200).json(rows);
  })
});

app.post("/api/users/:id/todo-list", bodyParser.json(), async (req, res) => {
  const request = await req.body
  if (!request.TodoListName || !req.params.id) {
    return res.status(400).json({ "error": "Cannot be null" });
  }
  const sql = `INSERT INTO todoLists(TodoListName,userId) VALUES (?,?)`;
  db.run(sql, [
    request.TodoListName,
    req.params.id,
  ], (err) => {
    if (err) return res.status(500).json({ "error": err.message });
  })
  return res.status(202).json();
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
    !request.title,
    !request.todoListId) {
    return res.status(400).json({ "error": "Cannot be null" });
  }
  const sql = `INSERT INTO todos(title,description,todoListId) VALUES (?,?,?)`;
  db.run(sql, [
    request.title,
    request.description,
    request.todoListId
  ], (err) => {
    if (err) return res.status(500).json({ "error": err.message });
  })
  return res.status(202).json({ "status": "accepted" });
});

app.get("/api/todos", async (req, res) => {
  const sql = `SELECT * FROM todos where todoListId = '${req.query.todoListId}'`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json("error");
    return res.status(200).json(rows);
  })
});

app.put("/api/todos/:id", bodyParser.json(), async (req, res) => {
  const request = await req.body
  if (request.complete == null) {
    return res.status(400).json({ "error": "Cannot be null" });
  }
  const sql = `update todos set 'complete'=(?) where todoId =(?)`;

  db.run(sql, [
    request.complete,
    req.params.id
  ], (err) => {
    if (err) {
      return res.status(500).json({ "error": err.message });
    }
    else {
      return res.status(202).json({ "status": "accepted" });
    }
  })
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});