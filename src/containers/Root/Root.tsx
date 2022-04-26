import React from "react";
import { useUser } from "../../contexts/UserContext";
import { Dashboard } from "../Dashboard/Dashboard";
import { NoUserRoot } from "./NoUserRoot";

export const Root: React.FunctionComponent = () => {
  const user = useUser();

  if (user === undefined) {
    return <div>loading</div>;
  }

  if (user === null) {
    return <NoUserRoot />;
  }

  return <Dashboard />;
};
