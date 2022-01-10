import { Button } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'

const PetCard = ({name, photoHref, petAdoptionStatus, id}) => {
    const navigate = useNavigate()
    return (
        <div className='centered_content pet-preview-card'>
            <img style={{width: '100%', aspectRatio:'19/9'}} src={photoHref} alt="petPhoto"/>
            <h2>{name}</h2>
            <h4>{petAdoptionStatus}</h4>
            <Button onClick={() => navigate(`/PetPage/${id}`)}>Click for details</Button>
        </div>
    )
}

export default PetCard
