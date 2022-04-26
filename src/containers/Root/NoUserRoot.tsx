import React from "react";
import { Text, FontWeights, ITextStyles, DefaultButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../components/Section/Section";

const textStyles: Partial<ITextStyles> = {
  root: {
    fontWeight: FontWeights.regular,
    color: "white",
  },
};

export const NoUserRoot: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <>
      <Section centerText>
        <Text variant="mega" styles={textStyles}>
          Welcome to USF's Course Management System
        </Text>
        <Text variant="xxLarge" styles={textStyles}>
          A platform to register for courses and see your past enrollments
        </Text>
      </Section>
      <Section horizontal extraSpacing>
        <DefaultButton onClick={() => navigate("/register")}>
          Register
        </DefaultButton>
        <DefaultButton onClick={() => navigate("/login")}>Login</DefaultButton>
      </Section>
    </>
  );
};
