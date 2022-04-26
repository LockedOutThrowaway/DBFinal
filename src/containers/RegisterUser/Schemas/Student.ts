import * as Yup from "yup";

export interface Student {
  major: string;
}

export const StudentValidationSchema: Yup.SchemaOf<Student> = Yup.object({
  major: Yup.string().required("Major is required"),
});
