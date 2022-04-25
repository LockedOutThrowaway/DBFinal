import sqlite from "sqlite3";
import { readFile } from "fs/promises";
import { open } from "sqlite";

const database = await open({
  filename: ":memory:",
  driver: sqlite.Database,
});

const setupSql = await readFile("./server/db/setup.sql", "utf8");

await database.exec(setupSql);

export { database };
