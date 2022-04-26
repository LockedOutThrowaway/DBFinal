import React from "react";
import { DefaultButton, FontWeights, ITextStyles, Text } from "@fluentui/react";
import { Section } from "../Section/Section";

export interface Course {
  Category: string;
  Code: string;
  Title: string;
  Grade?: string;
  Credits: number;
  PreRequisites?: Omit<Course, "PreRequisites" | "Credits">[];
}

type CourseListProps = {
  courses: Course[] | undefined;
  showGrade?: boolean;
  actions?: {
    label: string;
    onClick: (course: Course) => void;
  }[];
};

const nonBoldTextStyles: Partial<ITextStyles> = {
  root: {
    fontWeight: FontWeights.regular,
  },
};

export const CourseList: React.FunctionComponent<CourseListProps> = ({
  courses,
  showGrade,
  actions,
}) => {
  return courses?.length === 0 ? (
    <div style={{ backgroundColor: "white", padding: 20 }}>
      <Text styles={nonBoldTextStyles}>No courses found</Text>
    </div>
  ) : (
    <Section>
      {courses?.map((course, i) => (
        <div
          style={{ backgroundColor: "white", padding: 20 }}
          key={course.Code + course.Category + i}
        >
          <Section centerText>
            <Text variant="xLarge" styles={nonBoldTextStyles}>
              {course.Category}-{course.Code}: {course.Title}
            </Text>
            <Text variant="large" styles={nonBoldTextStyles}>
              Credits: {course.Credits}
            </Text>
            {showGrade && (
              <Text variant="large" styles={nonBoldTextStyles}>
                Grade: {course.Grade ?? "N/A"}
              </Text>
            )}

            {course.PreRequisites?.length && (
              <>
                <Text variant="mediumPlus">Pre-Requisites</Text>
                {course.PreRequisites.map((preReq) => (
                  <Text
                    key={
                      course.Code +
                      preReq.Code +
                      course.Category +
                      preReq.Category
                    }
                  >
                    {preReq.Category}-{preReq.Code}: {preReq.Title} (Minimum
                    Grade: {preReq.Grade})
                  </Text>
                ))}
              </>
            )}

            {actions?.length && (
              <Section horizontal extraSpacing centerContents>
                {actions.map((action) => (
                  <DefaultButton onClick={() => action.onClick(course)}>
                    {action.label}
                  </DefaultButton>
                ))}
              </Section>
            )}
          </Section>
        </div>
      ))}
    </Section>
  );
};
