import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PetCard from '../../../../Components/PetCard/PetCard'

const SearchQueryResult = () => {
    const petsFetched = useSelector((state) => state.searchedPets.pets)
    return (
        <div className='centered_content'>
            <h2>Results({petsFetched.length > 0 && petsFetched.length})</h2>
            {
                petsFetched.length === 0 && <h2>Type Any Search You Want!</h2> 
            }
            {
                petsFetched.map(pet => (
                    <PetCard id={pet?._id} petAdoptionStatus={pet?.adoptionStatus} name={pet?.name} photoHref={pet.picture}/>
                ))
            }
            
        </div>
    )
}

export default SearchQueryResult
