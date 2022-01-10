import axios from "./axiosInstance.config";

export const getPetDetailsById = async(petId) =>{
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_APP}/pets/${petId}`)
        return data
}
export const AdoptPet = async(petId,userEmail, Type) =>{
    const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_APP}/pets/${petId}/adopt`,{userEmail, Type})
    console.log(data)
}
export const FosterPet = async(petId,userEmail, Type) =>{
    const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_APP}/pets/${petId}/foster`,{userEmail, Type})
    console.log(data)
}

export const SavePet = async(petId,userEmail) =>{
    const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_APP}/pets/${petId}/save`,{userEmail})
    console.log(data)
}
export const getLikePets = async(userId) =>{
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_APP}/pets/user/${userId}`)
    const mergedLists = Object.values(data).map(async(arrayOfPetsId) =>{
        return await Promise.all(arrayOfPetsId.map(async(petId) =>{
            const data = getPetDetailsById(petId)
            return data
        }))
    })
    
    return await Promise.all(mergedLists);
} 

export const getAllPets = async() =>{
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_APP}/pets`)
    return data;
}

export const returnPetToShelter = async(userId, petId) =>{
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_APP}/pets/${petId}/return`,{userId})
        return true
}
export const unSavePet =  async(petId, userEmail) =>{
    console.log(userEmail)
    const {data} = await axios.delete(`${process.env.REACT_APP_BACKEND_APP}/pets/${petId}/save`,{data: {userEmail}})
    console.log(data)
}