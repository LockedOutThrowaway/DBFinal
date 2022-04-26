import React from "react";
import { useFormik } from "formik";
import {
  DefaultButton,
  ITextFieldStyles,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { Student, StudentValidationSchema } from "./Schemas/Student";
import { Section } from "../../components/Section/Section";

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
    <>
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
      <Section horizontal extraSpacing>
        <DefaultButton onClick={onCancel}>Previous</DefaultButton>
        <PrimaryButton onClick={() => handleSubmit()} disabled={!isValid}>
          Submit
        </PrimaryButton>
      </Section>
    </>
  );
};
