import React, {useState} from 'react'
import axios from 'axios'
export default function UploadPetImage() {
    const [uploadFile, setUploadFile] = useState()
    const onSubmit = async() =>{
        if(uploadFile !== undefined && uploadFile !== null){
            const formData = new FormData()
            formData.append('petImage', uploadFile[0])
            const res = await axios.post('http://localhost:5000/pets/Img',formData)
        }
    }
    return (
        <div>
           <input
           type="file"
           accept='image/*'
           onChange={(e) => setUploadFile(e.target.files)}
           />
           <button onClick={onSubmit}>send</button>
        </div>
    )
}
