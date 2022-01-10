import React from 'react';
import { Routes, Route } from "react-router-dom";
import SearchPage from './Pages/SearchPage/SearchPage.jsx';
import ProfileSettings from './Pages/ProfileSettings/ProfileSettings.jsx';
import PetsPage from './Pages/PetsPage/PetsPage'
import MyPetsPage from './Pages/MyPetsPage/MyPetsPage'
import PetPage from './Pages/PetPage/PetPage'
import HomePage from './Pages/HomePage/HomePage.jsx';


export default function App() {

  return (
      
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/ProfileSettings" element={<ProfileSettings />} />
        <Route path="/PetsPage" element={<PetsPage />} />
        <Route path="/MyPetsPage" element={<MyPetsPage />} />
        <Route path="/PetPage/:petId" element={<PetPage />} />
      </Routes>
  );
}
