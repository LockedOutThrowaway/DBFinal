import {
  FontWeights,
  IStackStyles,
  IStackTokens,
  ITextFieldStyles,
  ITextStyles,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../../components/Background/Background";
import { LoginSchema, LoginType } from "./LoginSchema";
import { UserContext } from "../../contexts/UserContext";

const stackTokens: IStackTokens = {
  childrenGap: 15,
};
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "0 auto",
  },
};
const textStyles: Partial<ITextStyles> = {
  root: {
    fontWeight: FontWeights.regular,
    color: "white",
  },
};

const errorTextStyles: Partial<ITextStyles> = {
  root: {
    color: "rgb(164, 38, 44)",
  },
};

const inputStyles: Partial<ITextFieldStyles> = {
  root: {
    width: 300,
  },
  subComponentStyles: {
    label: {
      root: {
        color: "white",
      },
    },
  },
};

const initialValues: LoginType = {
  username: "",
  password: "",
};

const login = async (values: LoginType) => {
  const result = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return result.ok;
};

export const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState<string>();
  const userContext = useContext(UserContext);

  const onSubmit = async (values: LoginType) => {
    try {
      const didLogIn = await login(values);

      if (didLogIn) {
        await userContext?.updateUser();
        navigate("/");
        return;
      }

      setMessage("Invalid username or password");
    } catch {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnMount: true,
    onSubmit,
  });

  if (userContext?.user) {
    navigate("/");
    return <></>;
  }

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
            Log in
          </Text>
          {message && (
            <Text variant="medium" styles={errorTextStyles}>
              {message}
            </Text>
          )}
        </Stack>
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          styles={stackStyles}
          tokens={stackTokens}
        >
          <TextField
            styles={inputStyles}
            name="username"
            label="Username:"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            errorMessage={touched.username ? errors.username : undefined}
            required
          />
          <TextField
            styles={inputStyles}
            name="password"
            label="Password:"
            type="password"
            canRevealPassword
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            errorMessage={touched.password ? errors.password : undefined}
            required
          />
          <div style={{ marginTop: 30 }}>
            <PrimaryButton onClick={() => handleSubmit()} disabled={!isValid}>
              Submit
            </PrimaryButton>
          </div>
        </Stack>
      </Stack>
    </Background>
  );
};
