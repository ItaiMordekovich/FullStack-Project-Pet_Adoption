import { Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PetCard from '../../Components/PetCard/PetCard'
import { getLikePets as getLikedAndSavedPets } from '../../Services/pets.service'

const MyPetsPage = () => {
    const [togglePetsView, setTogglePetsView] = useState(false)
    const [petsPreview, setPetsPreview] = useState([])
    const {userDetails} = useSelector(state => state.userData)

    useEffect(() => {
        const fetchSavedAndLikedPets = async(showLikedPets) =>{
            const myPets = (await getLikedAndSavedPets(userDetails._id)) 
            console.log(myPets)
            showLikedPets ? setPetsPreview(myPets[2]) : setPetsPreview(myPets[0])  
        }
        if(togglePetsView) return fetchSavedAndLikedPets(true);
        else return fetchSavedAndLikedPets(false);
    }, [togglePetsView])
    console.log(petsPreview)
    return (
        <div>
            <div className='centered_content'>
                <h1>My Adopted Pets</h1>
            </div>
            <div className='centered_content'>
            <Typography style={{ display: "inline" }}>
        Click the toggle button to see your <strong>Saved Pets</strong>
        </Typography>
            <Switch
          checked={togglePetsView}
          onChange={(e) => setTogglePetsView(e.target.checked)}
          inputProps={{ "aria-label": "secondary checkbox" }}
          />
          </div>
        <div className="pets_cards_wrapper">
            {
               petsPreview.length >= 1 ? petsPreview.map(pet => (
               <PetCard id={pet?._id} petAdoptionStatus={pet?.adoptionStatus} name={pet?.name} photoHref={pet?.picture}/>
               )
                ) :(
                    <label className='centered_content'><strong>you currently do not own or foster any pets!</strong></label>
                )
            }
            </div>
        </div>
    )
}

export default MyPetsPage
