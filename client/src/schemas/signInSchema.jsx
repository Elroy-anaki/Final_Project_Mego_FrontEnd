import * as Yup from "yup";
const validationSignInSchema = Yup.object({
    userEmail: Yup.string().email("Invalid email address").required("Invalid email address"),
    userPassword: Yup.string()
      .min(5, "Must have at least 5 characters")
      .required("Must have at least 5 characters"),
  });

export default validationSignInSchema