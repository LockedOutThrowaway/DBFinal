import { IStackStyles, IStackTokens, Stack } from "@fluentui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Background } from "./components/Background/Background";
import { Login } from "./containers/Login/Login";
import { RegisterUser } from "./containers/RegisterUser/RegisterUser";
import { Root } from "./containers/Root/Root";
import { UserContextProvider } from "./contexts/UserContext";

const stackTokens: IStackTokens = {
  childrenGap: 15,
};

const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "0 auto",
    padding: 30,
    minHeight: "100vh",
  },
};

export const App: React.FunctionComponent = () => {
  return (
    <UserContextProvider>
      <Background>
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          tokens={stackTokens}
          styles={stackStyles}
          disableShrink
        >
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Stack>
      </Background>
    </UserContextProvider>
  );
};
