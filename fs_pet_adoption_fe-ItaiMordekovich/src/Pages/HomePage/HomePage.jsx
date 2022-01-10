import React from 'react'
import petsWelcome from './petsWelcome.png'
import "./HomePage.css"
import { useSelector } from 'react-redux';


export default function HomePage() {
    const { userDetails, isAuth } = useSelector((state) => state.userData)
    return (
        <>
            <div>
                <div className='welcome-header'>
                    {isAuth ? (
                        <>
                        <h1>Welcome back <u>{userDetails.firstName} {userDetails.lastName}!</u></h1>
                        <h2><br/><br/>Which pet would you like to adopt today?</h2>
                        </>
                    ) : (
                        <h1>Welcome to our Pets Adoption agency</h1>
                    )}
                </div>
                <div className='pets-image'>
                    <img src={petsWelcome} alt="pets welcome" />
                </div>
            </div>
        </>

    )
}
