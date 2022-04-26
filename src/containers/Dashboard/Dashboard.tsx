import React from "react";
import { FontWeights, Text } from "@fluentui/react";
import { User, useUser } from "../../contexts/UserContext";
import { LogOutButton } from "./LogOutButton";
import { Section } from "../../components/Section/Section";
import { StudentDashboard } from "./StudentDashboard";
import { FacultyDashboard } from "./FacultyDashboard";

export const Dashboard: React.FunctionComponent = () => {
  const user = useUser() as User;

  return (
    <>
      <Section centerText>
        <Text
          variant="mega"
          styles={{ root: { color: "white", fontWeight: FontWeights.regular } }}
        >
          Hi {user.Name}!
        </Text>
      </Section>
      <LogOutButton />
      <Section extraSpacing>
        {user.UserType === "student" ? (
          <StudentDashboard />
        ) : (
          <FacultyDashboard />
        )}
      </Section>
    </>
  );
};
