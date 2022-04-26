import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import { database } from "./db/database.js";
import SQL from "sql-template-strings";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await database.get(
        SQL`
        SELECT u.Username, u.UserId, u.PasswordHash
        FROM Users u
        WHERE Username = ${username}`
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
          CASE WHEN s.UserId IS NOT NULL THEN 'student' WHEN f.UserId IS NOT NULL THEN 'faculty' else null END AS UserType,
          s.StudentId, 
          f.FacultyId, 
          f.IsAdmin
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

export const setupAuthentication = (app) => {
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
