import React from "react";
import {
  Stack,
  Text,
  FontWeights,
  IStackTokens,
  IStackStyles,
  ITextStyles,
  Icon,
} from "@fluentui/react";
import { RegisterStudentForm } from "./RegisterStudentForm";

const textStyles: Partial<ITextStyles> = {
  root: {
    fontWeight: FontWeights.regular,
    color: "white",
  },
};

const stackTokens: IStackTokens = {
  childrenGap: 15,
};
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "0 auto",
    color: "#605e5c",
  },
};

export const RegisterStudent: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={stackStyles}
      tokens={stackTokens}
    >
      <Text variant="mega" styles={textStyles}>
        Welcome Student! <Icon iconName="Education"></Icon>
      </Text>
      <Text variant="xxLarge" styles={textStyles}>
        We just need some information to get your profile ready
      </Text>

      <div>
        <RegisterStudentForm />
      </div>
    </Stack>
  );
};
