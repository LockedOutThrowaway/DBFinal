import {
  DefaultButton,
  IStackStyles,
  IStackTokens,
  ITextFieldStyles,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const stackTokens: IStackTokens = {
  childrenGap: 15,
};
const stackStyles: Partial<IStackStyles> = {
  root: {
    marginTop: "15px",
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

const initialValues = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
  major: "",
};

const registerStudentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  major: Yup.string()
    .required("Major is required")
    .matches(
      /^[a-zA-Z ]+$/,
      "Major cannot contain special characters or numbers"
    ),
});

export const RegisterStudentForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const onCancel = () => navigate("/");
  const {
    resetForm,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: registerStudentSchema,
    onSubmit: async (values) => {
      const response = await fetch("/register/student");
      const data = await response.json();
      console.log(data);
      resetForm();
    },
  });

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={stackStyles}
      tokens={stackTokens}
    >
      <TextField
        styles={inputStyles}
        name="name"
        label="Name:"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        errorMessage={touched.name ? errors.name : undefined}
        required
      />
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
        name="major"
        label="Major:"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.major}
        errorMessage={touched.major ? errors.major : undefined}
        required
      />
      <TextField
        styles={inputStyles}
        name="password"
        label="Password:"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        errorMessage={touched.password ? errors.password : undefined}
        required
        type="password"
        canRevealPassword
      />
      <TextField
        styles={inputStyles}
        name="confirmPassword"
        label="Confirm Password:"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.confirmPassword}
        errorMessage={
          touched.confirmPassword ? errors.confirmPassword : undefined
        }
        required
        type="password"
      />

      <div>
        <Stack horizontal styles={stackStyles} tokens={stackTokens}>
          <DefaultButton onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </DefaultButton>
          <PrimaryButton
            onClick={() => handleSubmit()}
            disabled={!isValid || isSubmitting}
          >
            Submit
          </PrimaryButton>
        </Stack>
      </div>
    </Stack>
  );
};
