import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/NavBar/Navbar';
import HomePage from './Pages/HomePage/HomePage.jsx';
import SearchPage from './Pages/SearchPage/SearchPage.jsx';
import ProfileSettings from './Pages/ProfileSettings/ProfileSettings.jsx';
import PetsPage from './Pages/PetsPage/PetsPage'
import MyPetsPage from './Pages/MyPetsPage/MyPetsPage'
import PetPage from './Pages/PetPage/PetPage'
import AuthWrapper from './Components/Auth/AuthWrapper';
import App from './App';


export default function AppWrapper() {


  return (
      <BrowserRouter>
       <Navbar />
       <Routes>
        <Route 
            path="*"
            element={<AuthWrapper>
                <App/>    
                </AuthWrapper>}/>
            </Routes>
    </BrowserRouter>
  );
}