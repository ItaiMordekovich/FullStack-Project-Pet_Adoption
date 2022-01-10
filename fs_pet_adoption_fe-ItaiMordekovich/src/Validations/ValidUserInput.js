import * as yup from 'yup'

export const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    firstName: yup.string().required('must provide your first name'),
    lastName: yup.string().required('must provide your last name'),
    phNumber: yup.number("only numbers allowed").required('must provide your phone number'),
  });