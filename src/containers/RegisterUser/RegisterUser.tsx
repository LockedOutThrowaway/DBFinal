import React, { useContext, useState } from "react";
import {
  Stack,
  Text,
  FontWeights,
  IStackTokens,
  IStackStyles,
  ITextStyles,
  Icon,
} from "@fluentui/react";
import { Background } from "../../components/Background/Background";
import { UserForm } from "./UserForm";
import type { User } from "./Schemas/User";
import { useNavigate } from "react-router-dom";
import { Student } from "./Schemas/Student";
import { Faculty } from "./Schemas/Faculty";
import { StudentForm } from "./StudentForm";
import { FacultyForm } from "./FacultyForm";
import { UserContext, useUser } from "../../contexts/UserContext";

const textStyles: Partial<ITextStyles> = {
  root: {
    fontWeight: FontWeights.regular,
    color: "white",
  },
};

const errorTextStyles: Partial<ITextStyles> = {
  root: {
    fontWeight: FontWeights.regular,
    color: "red",
  },
};

const stackTokens: IStackTokens = {
  childrenGap: 15,
};
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "0 auto",
  },
};

enum FormSection {
  InitialInformation,
  AccountTypeInformation,
}

export const RegisterUser: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const user = useUser();

  if (user) {
    navigate("/");
  }

  const [formSection, setFormSection] = useState(
    FormSection.InitialInformation
  );
  const [initialInformation, setInitialInformation] = useState<User>();
  const [message, setMessage] = useState<string>();
  const userContext = useContext(UserContext);

  const loadInitialInformation = (user: User) => {
    setInitialInformation(user);
    setMessage(undefined);
    setFormSection(FormSection.AccountTypeInformation);
  };

  const submitRegistration = async (
    additionalInformation: Student | Faculty
  ) => {
    const { confirmPassword, ...userProfile } = initialInformation as User;

    const completeProfile = {
      generalProfile: userProfile,
      specificProfile: additionalInformation,
    };

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(completeProfile),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await userContext?.updateUser();
      navigate("/");
    } else {
      returnToInitialInformation();
      setMessage(
        "We had a problem registering your account. Please try again."
      );
    }
  };

  const returnToInitialInformation = () => {
    setFormSection(FormSection.InitialInformation);
  };

  return (
    <Background>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={stackStyles}
        tokens={stackTokens}
      >
        <Stack styles={{ root: { textAlign: "center" } }} tokens={stackTokens}>
          <Text variant="mega" styles={textStyles}>
            {formSection === FormSection.InitialInformation ? (
              <>
                Welcome! <Icon iconName="Education"></Icon>
              </>
            ) : (
              "Just a few more details"
            )}
          </Text>
          <Text variant="xxLarge" styles={textStyles}>
            {formSection === FormSection.InitialInformation
              ? "Let's get your profile ready"
              : "And you'll be ready to go!"}
          </Text>
        </Stack>
        {message && (
          <Text variant="large" styles={errorTextStyles}>
            {message}
          </Text>
        )}

        <div>
          {formSection === FormSection.InitialInformation ? (
            <UserForm
              onSubmit={loadInitialInformation}
              initialValues={initialInformation}
            />
          ) : initialInformation?.accountType === "student" ? (
            <StudentForm
              onCancel={returnToInitialInformation}
              onSubmit={submitRegistration}
            />
          ) : (
            <FacultyForm
              onCancel={returnToInitialInformation}
              onSubmit={submitRegistration}
            />
          )}
        </div>
      </Stack>
    </Background>
  );
};
