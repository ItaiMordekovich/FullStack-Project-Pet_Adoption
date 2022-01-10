import * as yup from 'yup'

export const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length'),
    firstName: yup.string(),
    lastName: yup.string(),
    phNumber: yup.number("only numbers allowed"),
    bio: yup.string(),
  });