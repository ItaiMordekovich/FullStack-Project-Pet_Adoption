import React from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Reducers/User.reducer'

const LogOut = () => {
    const [,,removeCookie] = useCookies()
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(logout())
        removeCookie("token")
        removeCookie("userDetails")
        window.location.replace('/')
    },[])
    return (
        <>
            
        </>
    )
}

export default LogOut
