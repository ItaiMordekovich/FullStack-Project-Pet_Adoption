import axios from "./axiosInstance.config"

export const LoginUser = async(email, password) =>{
    const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_APP}/users/Login`, {email, password})
    return data;
}
export const RegisterUser = async(userDetails) =>{
    const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_APP}/users/SignUp`, userDetails)
    return data;
}
export const UpdateUserProfile = async(userUpdatedFields, id) =>{
    const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_APP}/users/${id}`, userUpdatedFields)
    return data;
}
export const getUser = async(_id) =>{
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_APP}/users/${_id}`)
    return data;
}