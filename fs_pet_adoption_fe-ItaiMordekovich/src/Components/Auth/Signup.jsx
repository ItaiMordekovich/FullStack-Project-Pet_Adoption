
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { validationSchema } from '../../Validations/ValidUserInput';
import { useFormik } from 'formik';
import { RegisterUser } from '../../Services/users.service';
import { toast } from 'react-toastify';



export default function Signup(props) {
  const onSubmit = async(userInput) =>{
    try{
      userInput.lastName = userInput.lastName.charAt(0).toUpperCase() + userInput.lastName.slice(1).toLowerCase();
      userInput.firstName = userInput.firstName.charAt(0).toUpperCase() + userInput.firstName.slice(1).toLowerCase();
      const data = await RegisterUser(userInput)
      props.SignInUser(data);
    }catch(e){
      console.log(e)
      toast.error("There was an error while trying to sign-up please, try again later")
    }
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName:'',
      lastName:'',
      phNumber:'',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });
    return (
      <form id="sign-up-form" onSubmit={formik.handleSubmit}  noValidate autoComplete="off">
       <p style={{fontSize: "18px"}}><strong>Signup</strong></p>
        <TextField name='email' variant="standard" id="login-TextField-Email-Address" label="Email Address" 
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}/>
        <TextField variant="standard" id="login-TextField-Phone-Number" label="Phone Number" name="phNumber"
        value={formik.values.phNumber}
        onChange={formik.handleChange}
        error={formik.touched.phNumber && Boolean(formik.errors.phNumber)}
        helperText={formik.touched.phNumber && formik.errors.phNumber}/>
        <TextField variant="standard" type="password" id="login-TextField-Password" label="Password" name="password"
         value={formik.values.password}
         onChange={formik.handleChange}
         error={formik.touched.password && Boolean(formik.errors.password)}
         helperText={formik.touched.password && formik.errors.password}
         />
        <TextField variant="standard" id="login-TextField-First-Name" label="First Name" name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName} />
        <TextField variant="standard" id="login-TextField-Last-Name" label="Last Name"  name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName} />
        
      </form>
    );
}







