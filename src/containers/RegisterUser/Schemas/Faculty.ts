import * as Yup from "yup";

export interface Faculty {
  title: string;
  department: string;
  isAdmin: boolean;
}

export const FacultyValidationSchema: Yup.SchemaOf<Faculty> = Yup.object({
  title: Yup.string().required("Title is required"),
  department: Yup.string().required("Department is required"),
  isAdmin: Yup.boolean()
    .required("Administrator role is required")
    .transform((value) => value === "true"),
});
