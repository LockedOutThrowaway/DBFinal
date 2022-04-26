import {
  ChoiceGroup,
  IChoiceGroupOption,
  IChoiceGroupStyles,
  IStackStyles,
  IStackTokens,
  ITextFieldStyles,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useFormik } from "formik";
import { UserValidationSchema, User } from "./Schemas/User";

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
    iconProps: {
      iconName: "academic",
    },
  },
  {
    key: "faculty",
    value: "faculty",
    text: "Faculty",
    iconProps: {
      iconName: "",
      styles: {
        root: {
          color: "black",
        },
      },
    },
  },
];

const defaultInitialValues = {
  name: "Jose Ramirez",
  username: "jose56",
  password: "Abcd1234!",
  confirmPassword: "Abcd1234!",
  accountType: "student",
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

      <div style={{ marginTop: 30 }}>
        <PrimaryButton onClick={() => handleSubmit()} disabled={!isValid}>
          Next
        </PrimaryButton>
      </div>
    </Stack>
  );
};
