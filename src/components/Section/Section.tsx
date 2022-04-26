import { IStackStyles, IStackTokens, Stack } from "@fluentui/react";
import React from "react";

const stackTokens: IStackTokens = {
  childrenGap: 15,
};

const stackStyles: IStackStyles = {
  root: {
    textAlign: "center",
  },
};

type SectionProps = {
  children: React.ReactNode;
  horizontal?: boolean;
  extraSpacing?: boolean;
  centerText?: boolean;
  centerContents?: boolean;
};

const extraSpacingStyle = {
  marginTop: 30,
};

export const Section: React.FunctionComponent<SectionProps> = ({
  children,
  horizontal,
  extraSpacing,
  centerText,
  centerContents,
}) => {
  return (
    <Stack
      tokens={stackTokens}
      styles={centerText ? stackStyles : undefined}
      horizontal={horizontal}
      style={extraSpacing ? extraSpacingStyle : undefined}
      verticalAlign={centerContents ? "center" : undefined}
      horizontalAlign={centerContents ? "center" : undefined}
    >
      {children}
    </Stack>
  );
};
