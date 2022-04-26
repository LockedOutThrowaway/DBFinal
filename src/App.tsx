import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./containers/Login/Login";
import { RegisterUser } from "./containers/RegisterUser/RegisterUser";
import { Root } from "./containers/Root/Root";
import { UserContextProvider } from "./contexts/UserContext";

export const App: React.FunctionComponent = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContextProvider>
  );
};
