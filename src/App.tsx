import { IStackStyles, Stack } from "@fluentui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RegisterUser } from "./containers/RegisterUser/RegisterUser";
import { Root } from "./containers/Root/Root";

const stackStyles: Partial<IStackStyles> = {
  root: {
    backgroundImage:
      "linear-gradient(180.4deg, rgba(188,120,236,1) -2.2%, rgba(29,133,163,1) 83.5%)",
  },
};

export const App: React.FunctionComponent = () => {
  return (
    <Stack verticalFill styles={stackStyles}>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/register/student"
          element={<RegisterUser type="student" />}
        />
        <Route
          path="/register/professor"
          element={<RegisterUser type="professor" />}
        />
      </Routes>
    </Stack>
  );
};
