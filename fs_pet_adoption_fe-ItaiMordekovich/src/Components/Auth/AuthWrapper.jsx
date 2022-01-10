import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../../Pages/HomePage/HomePage'
import SearchPage from '../../Pages/SearchPage/SearchPage'
import { login } from '../../Redux/Reducers/User.reducer'
import { getUser } from '../../Services/users.service'

const AuthWrapper = (props) => {
    const [cookies, setCookies] = useCookies()
    const userData = useSelector((state) => state.userData)
    const dispatch = useDispatch()
    useEffect(() => {
        if (cookies.token) {
            window.localStorage.clear()
            window.localStorage.setItem('jwt', cookies.token)
            const getUserDetails = async() =>{
                const userDetails = await getUser(cookies.userId.id)
                dispatch(login({ token: cookies.token, ...userDetails}))
            }
            getUserDetails()
        }
    }, [])
    if (userData.isAuth) {
        return (
            <>
                {props.children}
            </>
        )
    }
    else {
        return (
            <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/SearchPage" element={<SearchPage />} />
                <Route path="*" component={<div>
                    <label>User Is Not Authenticated, please sign in first</label>
                </div>} />
            </Routes>

        )
    }
}

export default AuthWrapper
