import express from "express";
import SQL from "sql-template-strings";
import { database } from "./db/database.js";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await database.get(
        SQL`SELECT Username, UserId, PasswordHash FROM users WHERE Username = ${username}`
      );

      if (!result) {
        return done(null, false, { message: "Wrong username or password." });
      }

      const match = await bcrypt.compare(password, result.PasswordHash);

      if (!match) {
        return done(null, false, { message: "Wrong username or password." });
      }

      return done(null, result);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.UserId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await database.get(
      SQL`
        SELECT
          u.UserId,
          u.Username,
          u.Name,
          CASE WHEN s.UserId IS NOT NULL THEN 'student' WHEN f.UserId IS NOT NULL THEN 'teacher' else null END AS UserType
        FROM
          Users u
        LEFT JOIN Faculty f ON f.UserId = u.UserId
        LEFT JOIN Students s ON s.UserId = u.UserId
        WHERE
          u.UserId = ${id}
      `
    );

    done(null, result);
  } catch (err) {
    return done(err);
  }
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

app.get("/api/users/:username/available", async (req, res) => {
  const { username } = req.params;
  const result = await database.get(
    SQL`SELECT EXISTS(SELECT 1 FROM users WHERE Username = ${username}) AS isTaken`
  );

  res.json(!result.isTaken);
});

app.post("/api/users", async (req, res) => {
  try {
    const { generalProfile, specificProfile } = req.body;
    const { name, username, password, accountType } = generalProfile;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    await database.run(
      SQL`INSERT INTO Users (Name, Username, PasswordHash) 
        VALUES (${name}, ${username}, ${hash})`
    );

    const user = await database.get(
      SQL`SELECT UserId FROM Users WHERE Username = ${username}`
    );

    if (accountType === "student") {
      const { major } = specificProfile;

      await database.run(
        SQL`INSERT INTO Students (UserId, Major) 
          VALUES (${user.UserId}, ${major})`
      );
    } else {
      const { department, title, isAdmin } = specificProfile;
      await database.run(
        SQL`INSERT INTO Professors (UserId, Department, Title, isAdmin) 
          VALUES (${user.UserId}, ${department}, ${title}, ${isAdmin})`
      );
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/api/users/current", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
