import React, { useContext, useEffect } from "react";

export type User = {
  UserId: number;
  Username: string;
  Name: string;
  UserType: "student" | "teacher";
};

const fetchUser = async () => {
  const response = await fetch("/api/users/current");

  if (response.ok) {
    const user = await response.json();
    return user;
  }

  return null;
};

type UserContextType = {
  user: User | undefined | null;
  updateUser: () => void;
};

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

export const useUser = (): UserContextType["user"] => {
  const context = useContext(UserContext);

  if (context === undefined) {
    return undefined;
  }

  return context.user;
};

export const UserContextProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = React.useState<UserContextType["user"]>();

  const updateUser = async () => {
    await fetchUser().then(setUser);
  };

  useEffect(() => {
    updateUser();

    const stop = window.setInterval(async () => {
      updateUser();
    }, 15000);

    return () => window.clearInterval(stop);
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
