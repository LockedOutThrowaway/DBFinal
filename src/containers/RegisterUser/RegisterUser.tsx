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

type RegisterUserProps = {
  type: "student" | "professor";
};

type UserData = {
  name: string;
  username: string;
  password: string;
};

const typeToTitleAndIcon = {
  student: {
    title: "Student",
    icon: "Education",
  },
  professor: {
    title: "Professor",
    icon: "D365TalentLearn",
  },
};

export const RegisterUser: React.FunctionComponent<RegisterUserProps> = ({
  type,
}) => {
  const { title, icon } = typeToTitleAndIcon[type];

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={stackStyles}
      tokens={stackTokens}
    >
      <Text variant="mega" styles={textStyles}>
        Welcome {title}! <Icon iconName={icon}></Icon>
      </Text>
      <Text variant="xxLarge" styles={textStyles}>
        We just need some information to get your profile ready
      </Text>

      <div></div>
    </Stack>
  );
};
