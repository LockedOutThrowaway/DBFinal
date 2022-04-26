import {
  ChoiceGroup,
  DefaultButton,
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
import { Faculty, FacultyValidationSchema } from "./Schemas/Faculty";

const stackTokens: IStackTokens = {
  childrenGap: 15,
};
const stackStyles: Partial<IStackStyles> = {
  root: {
    marginTop: "15px",
  },
};

const whiteLabelStyle: Partial<IChoiceGroupStyles> = {
  label: {
    color: "white",
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

const options: IChoiceGroupOption[] = [
  {
    key: "true",
    text: "Yes",
    value: "true",
    styles: {
      root: {
        color: "white",
      },
    },
  },
  {
    key: "false",
    text: "No",
    value: "false",
    styles: {
      root: {
        color: "white",
      },
    },
  },
];

type FacultyFormProps = {
  onSubmit: (values: Faculty) => void;
  onCancel: () => void;
};

const defaultInitialValues = {
  title: "",
  department: "",
  isAdmin: false,
};

export const FacultyForm: React.FunctionComponent<FacultyFormProps> = ({
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
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: defaultInitialValues,
    validationSchema: FacultyValidationSchema,
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
        name="title"
        label="Title:"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
        errorMessage={touched.title ? errors.title : undefined}
        required
      />
      <TextField
        styles={inputStyles}
        name="department"
        label="Department:"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.department}
        errorMessage={touched.department ? errors.department : undefined}
        required
      />
      <ChoiceGroup
        styles={whiteLabelStyle}
        onChange={(e) =>
          setFieldValue(
            "isAdmin",
            (e?.currentTarget as HTMLInputElement | undefined)?.value === "true"
          )
        }
        onBlur={handleBlur}
        label="Are you an administrator?"
        name="isAdmin"
        options={options}
        required
      />
      <div>
        <Stack horizontal styles={stackStyles} tokens={stackTokens}>
          <DefaultButton onClick={onCancel}>Cancel</DefaultButton>
          <PrimaryButton onClick={() => handleSubmit()} disabled={!isValid}>
            Submit
          </PrimaryButton>
        </Stack>
      </div>
    </Stack>
  );
};
