import * as Yup from "yup"


export const validationSchema = Yup.object({
    userName: Yup.string()
      .min(2, "The name must contain at least 2 characters")
      .max(20, "The name cannot exceed 20 characters")
      .required("Name is a required field"),
    userEmail: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Invalid email address")
      .required("Email is a required field"),
    userPassword: Yup.string()
      .min(5, "The password must contain at least 5 characters")
      .required("Password is a required field"),
  });

