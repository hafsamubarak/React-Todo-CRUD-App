import * as yup from "yup";
//min 6 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
//single word, only letters, with at least two characters and not empty
const firstNameRules = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/;
//prevent empty title
const titleRules = /^(?!\s*$).+/;
export const basicSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(firstNameRules, "Please enter valid name")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please Enter a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
  title: yup
    .string()
    .matches(titleRules, "Please enter a valid title")
    .required("Required"),
  priority: yup.string().required(),
  dueDate: yup.string().required(),
});
