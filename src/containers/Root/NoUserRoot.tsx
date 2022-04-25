import React from "react";
import {
  Stack,
  Text,
  FontWeights,
  IStackTokens,
  IStackStyles,
  ITextStyles,
  DefaultButton,
} from "@fluentui/react";
import "./Root.css";
import { useNavigate } from "react-router-dom";

const textStyles: Partial<ITextStyles> = {
  root: {
    fontWeight: FontWeights.regular,
    color: "white",
  },
};
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "0 auto",
    textAlign: "center",
    color: "#605e5c",
  },
};

export const NoUserRoot: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={stackStyles}
      tokens={stackTokens}
    >
      <Text variant="mega" styles={textStyles}>
        Welcome to USF's Course Management System
      </Text>
      <Text variant="xxLarge" styles={textStyles}>
        Let's get you registered
      </Text>
      <Stack
        horizontal
        tokens={stackTokens}
        styles={{
          root: {
            paddingBlockStart: 30,
          },
        }}
      >
        <DefaultButton
          iconProps={{
            iconName: "Education",
          }}
          onClick={() => navigate("/register/student")}
        >
          I am a Student
        </DefaultButton>
        <DefaultButton
          iconProps={{
            iconName: "D365TalentLearn",
          }}
          onClick={() => navigate("/register/professor")}
        >
          I am a Professor
        </DefaultButton>
      </Stack>
    </Stack>
  );
};
