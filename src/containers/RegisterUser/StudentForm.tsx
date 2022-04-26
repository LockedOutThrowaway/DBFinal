import React from "react";
import { useFormik } from "formik";
import {
  DefaultButton,
  IStackStyles,
  IStackTokens,
  ITextFieldStyles,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { Student, StudentValidationSchema } from "./Schemas/Student";

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

const defaultInitialValues = {
  major: "",
};

type UserFormProps = {
  onSubmit: (values: Student) => void;
  onCancel: () => void;
  initialValues?: Student;
};

export const StudentForm: React.FunctionComponent<UserFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    handleSubmit,
  } = useFormik({
    initialValues: defaultInitialValues,
    validationSchema: StudentValidationSchema,
    validateOnMount: true,
    onSubmit,
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
        name="major"
        label="Major:"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.major}
        errorMessage={touched.major ? errors.major : undefined}
        required
      />
      <div>
        <Stack horizontal styles={stackStyles} tokens={stackTokens}>
          <DefaultButton onClick={onCancel}>Previous</DefaultButton>
          <PrimaryButton onClick={() => handleSubmit()} disabled={!isValid}>
            Submit
          </PrimaryButton>
        </Stack>
      </div>
    </Stack>
  );
};
