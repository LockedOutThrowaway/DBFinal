CREATE TABLE Users(
    UserId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    Username TEXT NOT NULL UNIQUE,
    Name TEXT NOT NULL,
    PasswordHash TEXT NOT NULL
);

CREATE TABLE Students(
    StudentId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    UserId INTEGER NOT NULL UNIQUE,
    Major TEXT NOT NULL,
    FOREIGN KEY(UserId) REFERENCES Users(UserId)
);

CREATE TABLE Faculty(
    FacultyId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    UserId INTEGER NOT NULL UNIQUE,
    Title TEXT NOT NULL,
    Department TEXT NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    FOREIGN KEY(UserId) REFERENCES Users(UserId)
);

CREATE TABLE Courses(
    Category TEXT NOT NULL,
    Code TEXT NOT NULL,
    Title TEXT NOT NULL,
    Credits INTEGER NOT NULL,
    PRIMARY KEY(Category, Code)
);

CREATE TABLE Teaches(
    FacultyId INTEGER NOT NULL,
    CourseCategory TEXT NOT NULL,
    CourseCode TEXT NOT NULL,
    FOREIGN KEY(FacultyId) REFERENCES Faculty(FacultyId),
    FOREIGN KEY(CourseCategory, CourseCode) REFERENCES Courses(Category, Code)
);

CREATE TABLE PreRequisite(
    CourseCategory TEXT NOT NULL,
    CourseCode TEXT NOT NULL,
    PreCourseCategory TEXT NOT NULL,
    PreCourseCode TEXT NOT NULL,
    Grade TEXT NOT NULL,
    FOREIGN KEY(CourseCategory, CourseCode) REFERENCES Courses(Category, Code),
    FOREIGN KEY(PreCourseCategory, PreCourseCode) REFERENCES Courses(Category, Code)
);

CREATE TABLE Registration(
    StudentId INTEGER NOT NULL,
    CourseCategory TEXT NOT NULL,
    CourseCode TEXT NOT NULL,
    Grade TEXT,
    FOREIGN KEY(StudentId) REFERENCES Students(StudentId),
    FOREIGN KEY(CourseCategory, CourseCode) REFERENCES Courses(Category, Code)
);

INSERT INTO Courses VALUES ("PHY", "101", "Introduction to Physics", 3);
INSERT INTO Courses VALUES ('COT', '101', 'Intro to Computer Science', 3);
INSERT INTO Courses VALUES ('COT', '102', 'Intro to Computer Science II', 3);
INSERT INTO PreRequisite VALUES ('COT', '102', 'PHY', '101', 'C');
INSERT INTO PreRequisite VALUES ('COT', '102', 'COT', '101', 'C');
INSERT INTO Courses VALUES ('COT', '103', 'Intro to Computer Science III', 3);
INSERT INTO PreRequisite VALUES ('COT', '103', 'COT', '102', 'C');
INSERT INTO Courses VALUES ('COT', '104', 'Intro to Computer Science IV', 3);
INSERT INTO PreRequisite VALUES ('COT', '104', 'COT', '103', 'C');
INSERT INTO Courses VALUES ('COT', '105', 'Intro to Computer Science V', 3);
INSERT INTO PreRequisite VALUES ('COT', '105', 'COT', '104', 'C');
INSERT INTO Courses VALUES ('COT', '106', 'Intro to Computer Science VI', 3);
INSERT INTO PreRequisite VALUES ('COT', '106', 'COT', '105', 'C');
INSERT INTO Courses VALUES ('COT', '107', 'Intro to Computer Science VII', 3);
INSERT INTO PreRequisite VALUES ('COT', '107', 'COT', '106', 'C');
