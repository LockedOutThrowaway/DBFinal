import { IStackStyles, Stack } from "@fluentui/react";

const stackStyles: Partial<IStackStyles> = {
  root: {
    backgroundImage:
      "linear-gradient(180.4deg, rgba(188,120,236,1) -2.2%, rgba(29,133,163,1) 83.5%)",
  },
};

export const Background: React.FunctionComponent = ({ children }) => {
  return (
    <Stack styles={stackStyles} disableShrink>
      {children}
    </Stack>
  );
};
