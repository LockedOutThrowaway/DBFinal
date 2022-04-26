import {
  ChoiceGroup,
  IChoiceGroupOption,
  IChoiceGroupStyles,
  ITextFieldStyles,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { useFormik } from "formik";
import { Section } from "../../components/Section/Section";
import { UserValidationSchema, User } from "./Schemas/User";

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

const whiteLabelStyle: Partial<IChoiceGroupStyles> = {
  root: {
    width: 300,
  },
  label: {
    color: "white",
  },
};

const options: IChoiceGroupOption[] = [
  {
    key: "student",
    value: "student",
    text: "Student",
    styles: {
      root: {
        color: "white",
      },
    },
  },
  {
    key: "faculty",
    value: "faculty",
    text: "Faculty",
    styles: {
      root: {
        color: "white",
      },
    },
  },
];

const defaultInitialValues = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
  accountType: "",
};

type RegisterUserFormProps = {
  onSubmit: (user: User) => void;
  initialValues?: User;
};

export const UserForm: React.FunctionComponent<RegisterUserFormProps> = ({
  onSubmit,
  initialValues = defaultInitialValues as unknown as User,
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
    initialValues: initialValues,
    validationSchema: UserValidationSchema,
    validateOnMount: true,
    onSubmit,
  });

  return (
    <>
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

      <ChoiceGroup
        label="Account type:"
        name="accountType"
        options={options}
        styles={whiteLabelStyle}
        required
        onChange={handleChange}
        onBlur={handleBlur}
        defaultSelectedKey={values.accountType}
      />

      <Section horizontal extraSpacing>
        <PrimaryButton onClick={() => handleSubmit()} disabled={!isValid}>
          Next
        </PrimaryButton>
      </Section>
    </>
  );
};
