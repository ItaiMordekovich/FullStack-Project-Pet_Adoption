
import React from 'react'
import TextField from '@mui/material/TextField';
import { validationSchema } from '../../Validations/UpdateProfileValidSchema';
import { useFormik } from 'formik';
import { UpdateUserProfile } from '../../Services/users.service';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';



export default function ProfileSettings(props) {
    const { userDetails } = useSelector(state => state.userData)
  const onSubmit = async(userInput) =>{
      Object.entries(userInput).forEach(([key, value]) =>{
          if(value.length === 0) delete userInput[key]
      })
      console.log(userInput)
    try{
      const data = await UpdateUserProfile(userInput, userDetails._id)
      toast.success("Changed user details successfully!")
      setTimeout(() => {window.location.reload()}, 2000)
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
      bio:'',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });
    return (
      <form className='profile_form_layout' onSubmit={formik.handleSubmit}>
       <p style={{fontSize: "18px"}}><strong>Update Personal Details</strong></p>
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
        <TextField multiline variant="filled" name="bio" aria-label="Bio"  minRows={3}   placeholder="Fill Bio if you want "
        value={formik.values.bio}
        onChange={formik.handleChange}
        error={formik.touched.bio && Boolean(formik.errors.bio)}
        helperText={formik.touched.bio && formik.errors.bio}
/>
        <Button type="submit">Submit changes</Button>
      </form>
    );
}







