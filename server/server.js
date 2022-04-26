import express from "express";
import SQL from "sql-template-strings";
import { database } from "./db/database.js";
import bcrypt from "bcrypt";
import { setupAuthentication } from "./authentication.js";
import passport from "passport";

const app = express();

app.use(express.json());
setupAuthentication(app);

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
        SQL`INSERT INTO Faculty (UserId, Department, Title, isAdmin) 
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

app.get("/api/users/current/courses", async (req, res) => {
  if (req.user?.StudentId) {
    const { StudentId } = req.user;

    const pastClasses = await database.all(
      SQL`
      SELECT * FROM Registration r
      LEFT JOIN Courses c ON c.Category = r.CourseCategory AND c.Code = r.CourseCode
      LEFT JOIN Students s ON s.StudentId = r.StudentId
      WHERE s.StudentId = ${StudentId} AND Grade IS NOT NULL`
    );

    const currentClasses = await database.all(
      SQL`
      SELECT 
        c.Category,
        c.Code,
        c.Title,
        c.Credits
      FROM Registration r
      LEFT JOIN Courses c ON c.Category = r.CourseCategory AND c.Code = r.CourseCode
      LEFT JOIN Students s ON s.StudentId = r.StudentId
      WHERE s.StudentId = ${StudentId} AND Grade IS NULL`
    );

    const classesToEnroll = await database.all(
      SQL`
      SELECT
        c.Category,
        c.Code,
        c.Title,
        c.Credits,
        pre.Category AS PrereqCategory,
        pre.Code AS PrereqCode,
        pre.Title AS PrereqTitle,
        p.Grade AS PrereqGrade
      FROM Courses c
      LEFT JOIN Registration r 
        ON r.CourseCategory = c.Category 
        AND r.CourseCode = c.Code 
        AND r.StudentId = ${StudentId}
      LEFT JOIN PreRequisite p ON p.CourseCategory = c.Category AND p.CourseCode = c.Code
      LEFT JOIN Courses pre ON pre.Category = p.PreCourseCategory AND pre.Code = p.PreCourseCode
      WHERE r.StudentId IS NULL
      `
    );

    const final = {};

    classesToEnroll.forEach((course) => {
      if (!final[course.Category + course.Code]) {
        final[course.Category + course.Code] = {
          Category: course.Category,
          Code: course.Code,
          Title: course.Title,
          Credits: course.Credits,
          Grade: course.Grade,
          PreRequisites: [],
        };
      }

      if (course.PrereqCategory) {
        final[course.Category + course.Code].PreRequisites.push({
          Category: course.PrereqCategory,
          Code: course.PrereqCode,
          Title: course.PrereqTitle,
          Grade: course.PrereqGrade,
        });
      }
    });

    res.json({
      pastClasses,
      currentClasses,
      classesToEnroll: Object.values(final),
    });
  } else {
    res.sendStatus(401);
  }
});

app.post("/api/users/current/courses", async (req, res) => {
  if (req.user?.StudentId) {
    const { StudentId } = req.user;
    const { category, code } = req.body;

    await database.run(
      SQL`
      INSERT INTO Registration (StudentId, CourseCategory, CourseCode) 
      VALUES (${StudentId}, ${category}, ${code})`
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.delete("/api/users/current/courses", async (req, res) => {
  if (req.user?.StudentId) {
    const { StudentId } = req.user;
    const { category, code } = req.body;

    await database.run(
      SQL`DELETE FROM Registration WHERE StudentId = ${StudentId} AND CourseCategory = ${category} AND CourseCode = ${code}`
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get("/api/faculty/current/courses", async (req, res) => {
  if (req.user?.FacultyId) {
    const { FacultyId } = req.user;
    const taughtCourses = await database.all(
      SQL`
      SELECT * FROM Courses c
      LEFT JOIN Teaches t 
        ON t.CourseCategory = c.Category
        AND t.CourseCode = c.Code
      WHERE t.FacultyId = ${FacultyId}
      `
    );

    const coursesToTeach = await database.all(
      SQL`
      SELECT * FROM Courses c
      LEFT JOIN Teaches t
        ON t.CourseCategory = c.Category
        AND t.CourseCode = c.Code
      WHERE t.FacultyId IS NOT ${FacultyId}
      `
    );

    res.json({
      taughtCourses,
      coursesToTeach,
    });
  } else {
    res.sendStatus(401);
  }
});

app.post("/api/faculty/current/courses", async (req, res) => {
  if (req.user?.FacultyId) {
    const { FacultyId } = req.user;
    const { category, code } = req.body;

    await database.run(
      SQL`
      INSERT INTO Teaches (FacultyId, CourseCategory, CourseCode) 
      VALUES (${FacultyId}, ${category}, ${code})`
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.delete("/api/faculty/current/courses", async (req, res) => {
  if (req.user?.FacultyId) {
    const { FacultyId } = req.user;
    const { category, code } = req.body;

    await database.run(
      SQL`
      DELETE FROM Teaches 
      WHERE FacultyId = ${FacultyId} 
        AND CourseCategory = ${category} 
        AND CourseCode = ${code}`
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.post("/api/users/current/courses/grade", async (req, res) => {
  if (req.user?.StudentId) {
    const { StudentId } = req.user;
    const { category, code, grade } = req.body;

    await database.run(
      SQL`
      UPDATE Registration
      SET Grade = ${grade}
      WHERE StudentId = ${StudentId}
      AND CourseCategory = ${category}
      AND CourseCode = ${code}
      `
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
