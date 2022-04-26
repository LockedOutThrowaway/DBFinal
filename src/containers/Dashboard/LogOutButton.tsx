import { DefaultButton } from "@fluentui/react";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const LogOutButton: React.FunctionComponent = () => {
  const userContext = useContext(UserContext);

  const logOut = async () => {
    await fetch("/api/logout");
    userContext?.updateUser();
  };

  return <DefaultButton onClick={logOut}>Log Out</DefaultButton>;
};
