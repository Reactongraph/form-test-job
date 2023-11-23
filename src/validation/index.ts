import * as yup from "yup";
export const FormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  photo: yup.mixed().required(),
  gender: yup.string().required(),
  email: yup.string().email().required(),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .required(),
  dateOfBirth: yup.string().required(),
  city: yup.string().required(),
  professionalSkills: yup
    .array()
    .min(1, "Select at least one skill")
    .required(),
});
