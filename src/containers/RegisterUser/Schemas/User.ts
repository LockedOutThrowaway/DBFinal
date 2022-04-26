import * as Yup from "yup";

export interface User {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  accountType: "student" | "faculty";
}

export const UserValidationSchema: Yup.SchemaOf<User> = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers")
    .test("Username is Unique", "Username is already taken", async (value) => {
      if (!value) {
        return true;
      }

      try {
        const response = await fetch(`/api/users/${value}/available`);
        const isAvailable = await response.json();
        return isAvailable;
      } catch (error) {
        return false;
      }
    }),
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
  accountType: Yup.mixed<User["accountType"]>()
    .oneOf(["student", "faculty"])
    .required("Account type is required"),
});
