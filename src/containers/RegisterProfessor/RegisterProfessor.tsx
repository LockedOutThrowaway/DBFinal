import React from "react";
import {
  Stack,
  Text,
  FontWeights,
  IStackTokens,
  IStackStyles,
  ITextStyles,
  DefaultButton,
  PrimaryButton,
  Icon,
  TextField,
  ITextFieldStyles,
} from "@fluentui/react";
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
    color: "#605e5c",
  },
};

const inputStyles: Partial<ITextFieldStyles> = {
  root: {
    width: 300,
  },
  subComponentStyles: {
    label: {
      root: {
        color: "white",
      },
    },
  },
};

export const RegisterStaff: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const onCancel = () => navigate("/");
  const onSubmit = () => {};

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={stackStyles}
      tokens={stackTokens}
    >
      <Text variant="mega" styles={textStyles}>
        Welcome Professor! <Icon iconName="D365TalentLearn"></Icon>
      </Text>
      <Text variant="xxLarge" styles={textStyles}>
        We just need some information to get your profile ready
      </Text>
      <TextField label="Name:" styles={inputStyles} />
      <TextField label="Username:" styles={inputStyles} />
      <TextField label="Password:" styles={inputStyles} />
      <TextField label="Department:" styles={inputStyles} />
      <TextField label="Title:" styles={inputStyles} />
      <Stack
        horizontal
        tokens={stackTokens}
        styles={{
          root: {
            paddingBlockStart: 30,
          },
        }}
      >
        <DefaultButton onClick={onCancel}>Cancel</DefaultButton>
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      </Stack>
    </Stack>
  );
};
