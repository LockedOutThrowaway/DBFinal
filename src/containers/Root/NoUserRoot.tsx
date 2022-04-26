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
import { useNavigate } from "react-router-dom";
import { Background } from "../../components/Background/Background";

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
  },
};

export const NoUserRoot: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Background>
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
          A platform to register for courses and see your past enrollments
        </Text>
        <div>
          <Stack
            tokens={stackTokens}
            horizontal
            styles={{ root: { marginTop: 15 } }}
          >
            <DefaultButton onClick={() => navigate("/register")}>
              Register
            </DefaultButton>
            <DefaultButton onClick={() => navigate("/login")}>
              Login
            </DefaultButton>
          </Stack>
        </div>
      </Stack>
    </Background>
  );
};
