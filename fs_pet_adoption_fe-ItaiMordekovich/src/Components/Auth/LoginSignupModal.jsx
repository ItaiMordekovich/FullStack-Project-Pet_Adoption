import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Login from './Login';
import Signup from './Signup';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Reducers/User.reducer';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function LoginSignupModal(props) {
    const [switchView, setSwitchView] = useState(true);
    const dispatch = useDispatch()
    const [_, setCookies] = useCookies()
    const LoginFunc = useRef()

    const updateUserCookiesAndState = (userDetailsNToken) =>{
        setCookies('token', userDetailsNToken.token,{maxAge: 86000})
        window.localStorage.clear()
        window.localStorage.setItem('jwt', userDetailsNToken.token)
        setCookies('userId', {id: userDetailsNToken.userDetails._id},{maxAge: 86000})
        dispatch(login({token: userDetailsNToken.token, ...userDetailsNToken.userDetails }))
        props.toggleModal()
        axios.defaults.headers.common['Authorization'] = userDetailsNToken.token;
        toast.success("logged in")
    }
    const handleChange = (event, newValue) => {
        setSwitchView(prev => !prev)
    };

    return (
        <Modal
            open={(props.openModal) ? props.openModal : false}
            onClose={props.toggleModal}>
            <div className="modal-wrapper">
                <Tabs style={{ backgroundColor: '#F8F0FB' }} value={switchView ? 1 : 0} onChange={handleChange}>
                    <Tab label="SIGNUP" />
                    <Tab label="LOGIN" />
                </Tabs>
                <Box sx={{ display: `${switchView ? 'block' : 'none'}` }} p={3}>
                    <Login LoginFunc={LoginFunc} SignInUser={updateUserCookiesAndState}/>
                    <div style={{marginLeft: '280px', marginTop: '20px'}}>
                    <Button variant="text" onClick={() => LoginFunc.current()}>LOGIN</Button>
                    </div>
                </Box>
                <Box sx={{ display: `${!switchView ? 'block' : 'none'}` }} p={3} className="form-wrapper" >
                    <Signup SignInUser={updateUserCookiesAndState}/>
                    <div style={{marginLeft: '280px', marginTop: '20px'}}>
                    <Button variant="text" form="sign-up-form" type="submit">SIGNUP</Button>
                    </div>
                </Box>

            </div>
        </Modal>
    )
}








