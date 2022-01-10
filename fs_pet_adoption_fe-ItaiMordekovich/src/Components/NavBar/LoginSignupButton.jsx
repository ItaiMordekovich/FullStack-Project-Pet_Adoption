import Button from '@mui/material/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LogOut from './LogOut'

export default function LoginSignupButton(props) {
    const {userDetails, isAuth} = useSelector((state) => state.userData)
    const [willLogout, setWillLogout] = useState(false)
    return (
        <div>
        {isAuth ? (<>
            <label>Hello, {userDetails.firstName}  {userDetails.lastName}</label>
            <Button variant="outline" onClick={() => setWillLogout(true) }>Logout</Button>
            {willLogout ? <LogOut/> : null}
          </>):(
            <Button type="button" className="login-button" onClick={props.toggleModal}>
            Login
        </Button>
          )}
        </div>
       
    )
}