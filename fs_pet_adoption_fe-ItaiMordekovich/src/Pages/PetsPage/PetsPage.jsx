import React, { useEffect, useState } from 'react'
import PetCard from '../../Components/PetCard/PetCard'
import { getAllPets, getLikePets as getLikedPets } from '../../Services/pets.service'

const PetsPage = () => {
    
    const [petsPreview, setPetsPreview] = useState([])
    useEffect(() => {
        const fetchAllPets = async() =>{
            setPetsPreview(await getAllPets())
        }
        fetchAllPets()
    },[])
    return (
        <div>
            <div className='centered_content'>
                <h1>Welcome to Pets page</h1>
            </div>
        <div className="pets_cards_wrapper">
            {
               petsPreview.map(pet => (
               <PetCard id={pet?._id} petAdoptionStatus={pet?.adoptionStatus} name={pet?.name} photoHref={pet?.picture}/>
               )
                ) 
            }
            </div>
        </div>
    )
}

export default PetsPage
