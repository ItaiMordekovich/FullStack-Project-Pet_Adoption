import { Button, InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clear, setResults } from '../../../../Redux/Reducers/SearchedPets.reducer'
import { SearchPetByType } from '../../../../Services/search.service'

const BasicSearch = ({isAdvOn, setPetTypeForAdv}) => {
  const dispatch = useDispatch();
    const [petType, setPetType] = useState()
    const handleSubmit = async() =>{
      if(petType?.trim().length === 0) return toast.warning('You must choose pet type')
      try{
        
        const data = await SearchPetByType(petType)
        if(data.length === 0 ){
          toast.error("We Couldn't find any pet matching the search criteria")
          dispatch(clear())
          return
        }
        dispatch(setResults(data))
      }catch(e){
        console.log(e)
      }
    }
    return (
      <>
      <h1  style={{marginTop: "50px"}} >Search your pet</h1>
        <div>
          <FormControl >
            <InputLabel>Select Pet Type</InputLabel>
            <Select
            style={{width: '200px'}}
            label="Select Pet Type"
          labelId="demo-simple-select-label"
          value={petType}
          onChange={e => {setPetType(e.target.value); setPetTypeForAdv(e.target.value);}}
        >
          <MenuItem value={'Dog'}>Dog</MenuItem>
          <MenuItem value={'Cat'}>Cat</MenuItem>
          <MenuItem value={'Turtle'}>Turtle</MenuItem>
        </Select>
        <Button style={{marginTop: "20px", display: `${isAdvOn ? 'none': 'inline'}`}} color="primary" variant="contained" onClick={handleSubmit}>Search</Button>
        </FormControl>
        </div>
        </>
    )
}

export default memo(BasicSearch)
