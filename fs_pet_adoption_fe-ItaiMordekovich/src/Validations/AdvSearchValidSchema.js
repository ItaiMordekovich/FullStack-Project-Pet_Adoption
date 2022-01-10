import * as Yup from 'yup'


export const validationSchema = Yup.object({
  maxWeight: Yup
  .number().min(1,).typeError('must be a positive number'),
  minWeight: Yup
  .number('must be a number').typeError('must be a positive number'),
  maxHeight: Yup
  .number().positive().typeError('must be a positive number'),
    minHeight: Yup
      .number().typeError('must be a positive number'),
    petName: Yup
      .string('Enter your petName')
  });