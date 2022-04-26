import React from "react";
import { Background } from "../../components/Background/Background";
import { Text } from "@fluentui/react";
import { User, useUser } from "../../contexts/UserContext";
import { LogOutButton } from "./LogOutButton";

export const Dashboard: React.FunctionComponent = () => {
  const user = useUser() as User;

  return (
    <Background>
      <Text variant="mega">Hi {user.Name}!</Text>
      <LogOutButton />
    </Background>
  );
};
