import axios from "axios"

export const SearchPetByType = async(petType) =>{
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_APP}/pets?type=${petType}`)
    return data;
}
export const AdvSearchPet = async({petType, petName, petStatus, minWeight, minHeight, maxWeight, maxHeight}) =>{
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_APP}/pets?type=${petType}&name=${petName}&adoptionStatus=${petStatus}&minWeight=${minWeight}&maxWeight=${maxWeight}&minHeight=${minHeight}&maxHeight=${maxHeight}`)
    return data;
}