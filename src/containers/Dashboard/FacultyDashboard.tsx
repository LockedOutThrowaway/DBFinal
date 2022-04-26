import React, { useEffect } from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import { Course, CourseList } from "../../components/CourseList/CourseList";

const fetchCourses = async () => {
  const response = await fetch("/api/faculty/current/courses");
  const data = await response.json();

  return data;
};

const setTeaching = async (course: Course) => {
  await fetch("/api/faculty/current/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: course.Category,
      code: course.Code,
    }),
  });
};

const removeTeaching = async (course: Course) => {
  await fetch("/api/faculty/current/courses", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: course.Category,
      code: course.Code,
    }),
  });
};

export const FacultyDashboard: React.FunctionComponent = () => {
  const [data, setData] = React.useState<any>();

  useEffect(() => {
    fetchCourses().then(setData);
  }, []);

  const onSetTeaching = async (course: Course) => {
    await setTeaching(course);
    await fetchCourses().then(setData);
  };

  const onRemoveTeaching = async (course: Course) => {
    await removeTeaching(course);
    await fetchCourses().then(setData);
  };

  return (
    <Pivot
      styles={{
        text: {
          color: "white",
        },
      }}
    >
      <PivotItem headerText="Courses You Teach">
        <CourseList
          courses={data?.taughtCourses}
          actions={[{ label: "Stop Teaching", onClick: onRemoveTeaching }]}
        />
      </PivotItem>
      <PivotItem headerText="New Courses">
        <CourseList
          courses={data?.coursesToTeach}
          actions={[{ label: "Teach this course", onClick: onSetTeaching }]}
        />
      </PivotItem>
    </Pivot>
  );
};
