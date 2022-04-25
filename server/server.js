import express from "express";
import SQL from "sql-template-strings";
import { database } from "./db/database.js";

const app = express();

app.use("api/register/student", async (req, res) => {
  const a = await database.all(SQL`SELECT * FROM students`);
  res.send(a);
});

app.use("/register/professor", (req, res) => {
  res.send("hi");
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
