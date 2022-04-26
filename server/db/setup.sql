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
    ProfessorId INTEGER NOT NULL,
    CourseCategory TEXT NOT NULL,
    CourseCode TEXT NOT NULL,
    FOREIGN KEY(ProfessorId) REFERENCES Faculty(FacultyId),
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