import React, { useEffect } from "react";
import { Course, CourseList } from "../../components/CourseList/CourseList";
import { Pivot, PivotItem } from "@fluentui/react";

const fetchCourses = async () => {
  const response = await fetch("/api/users/current/courses");
  const data = await response.json();

  return data;
};

export const StudentDashboard: React.FunctionComponent = () => {
  const [courses, setCourses] = React.useState<any>();

  useEffect(() => {
    fetchCourses().then(setCourses);
  }, []);

  const onEnroll = async (course: Course) => {
    await fetch("/api/users/current/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: course.Category,
        code: course.Code,
      }),
    });

    await fetchCourses().then(setCourses);
  };

  const onDrop = async (course: Course) => {
    await fetch("/api/users/current/courses", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: course.Category,
        code: course.Code,
      }),
    });

    await fetchCourses().then(setCourses);
  };

  const onGrade = async (course: Course) => {
    await fetch("/api/users/current/courses/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: course.Category,
        code: course.Code,
        grade: "A",
      }),
    });

    await fetchCourses().then(setCourses);
  };

  return (
    <Pivot
      styles={{
        text: {
          color: "white",
        },
      }}
    >
      <PivotItem headerText="Current Courses">
        <CourseList
          actions={[
            { label: "Drop", onClick: onDrop },
            { label: "Mark as Complete", onClick: onGrade },
          ]}
          courses={courses?.currentClasses}
        />
      </PivotItem>
      <PivotItem headerText="Past Courses">
        <CourseList showGrade courses={courses?.pastClasses} />
      </PivotItem>
      <PivotItem headerText="Registration">
        <CourseList
          courses={courses?.classesToEnroll}
          actions={[{ label: "Enroll", onClick: onEnroll }]}
        />
      </PivotItem>
    </Pivot>
  );
};
