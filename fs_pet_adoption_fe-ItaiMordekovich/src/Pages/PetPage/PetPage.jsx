import React, { useEffect, useState } from 'react'
import { getPetDetailsById } from '../../Services/pets.service'
import {useParams } from 'react-router-dom';
import PetDetailsTable from '../../Components/PetDetailsTable/PetDetailsTable';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { petUserActionController } from './petPage.service';
import { toast } from 'react-toastify';
import { SettingsRemoteOutlined } from '@mui/icons-material';


const PetPage = () => {
    const {petId} = useParams()
    const [rows, setRows] = useState([])
    const {userDetails} = useSelector(state => state.userData)
    const [isPetSaved, setIsSavedPet] = useState(false)
    const [routeToPetPic, setRouteToPetPic] = useState()
    const [petDetails, setPetDetails] =useState()
    console.log()
    useEffect(() => {
       const fetchPetDetails = async() =>{
           const data = await getPetDetailsById(petId)
           const petDetails = []
           setRouteToPetPic(data.picture)
           setPetDetails(data)
           Object.entries(data).forEach(([key, value]) =>{
               if(key === 'picture' || key === '_id') return;
               if(value.length === 0 ) value = "No Content"
               petDetails.push({name: key.charAt(0).toUpperCase() + key.slice(1), value: String(value)}) 
           })
          setRows(petDetails)
          setIsSavedPet(userDetails.petsLiked.includes(petId))
       }
       fetchPetDetails()
    }, [])
    const handleUserAction = async(action, params) =>{
        const [didSucceded, result] = await petUserActionController(action, params)
        if(didSucceded){
            toast.success("pet status has changed !")
            setTimeout(() => window.location.reload(), 1500)
        }else{
            toast.error("pet didn't changed it status, please try again")
        }
    }
    return (
        <div className='centered_content'>
            <h1>Pet's Details</h1>
            <img src={routeToPetPic} className='img_size' alt="pet-pic"/>
            <div>
                {userDetails?.petsAdopted.includes(petId) && <Button variant="contained" onClick={() => handleUserAction("returnPet", {petId: petId,userId: userDetails._id})}>Return Pet</Button>} 
                {petDetails?.adoptionStatus !== "Adopted" && <Button variant="contained" onClick={() => handleUserAction("adopt", {Id: petId,email: userDetails.email,Type: "Adopted"})}>Adopt Pet</Button>} 
                {petDetails?.adoptionStatus === "Available" && <Button style={{marginLeft: "5px"}} variant="contained" onClick={() => handleUserAction("foster", {Id: petId,email: userDetails.email,Type: "Fostered"})}>Foster Pet</Button> }
                <Button style={{marginLeft: "5px"}} variant="contained" onClick={() => handleUserAction(isPetSaved ? "deletePetFromSaved":"save", {Id: petId,email: userDetails.email})}>{isPetSaved ? "unsave" : "Save Pet"}</Button>
            </div>
        <div className='centered_content' style={{width: '70%'}}>
           <PetDetailsTable rows={rows} />
        </div>
        </div>
    )
}

export default PetPage


