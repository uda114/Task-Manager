import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  //console.log("working");
});

app.get("/api/data", async (req, res) => {
  //console.log("working");
  try {
    const result = await db.query("SELECT * FROM Note");
    //console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/addNote", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO Note (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json({ rows: result.rows, success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

app.delete("/api/deleteNote/:id", async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {
    const result = await db.query("DELETE FROM Note WHERE id = $1", [id]);
    //console.log(result);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

app.post("/api/login", async (req, res) => {
  //console.log("working");
  const { username, password } = req.body;
  //console.log(username, password);
  //console.log(typeof password);

  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (result.rows.length > 0) {
    const user = result.rows[0];

    //console.log(user.password);
    //console.log(typeof user.password);

    if (user.password === password) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Incorrect password" });
    }
  } else {
    res.json({ success: false, message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
