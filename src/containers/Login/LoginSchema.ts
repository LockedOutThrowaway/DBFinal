import * as Yup from "yup";

export interface LoginType {
  username: string;
  password: string;
}

export const LoginSchema: Yup.SchemaOf<LoginType> = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
