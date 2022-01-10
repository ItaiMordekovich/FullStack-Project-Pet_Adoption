import { Button, MenuItem, Select, TextField, FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clear, setResults } from '../../../../Redux/Reducers/SearchedPets.reducer';
import { AdvSearchPet } from '../../../../Services/search.service';
import { validationSchema } from '../../../../Validations/AdvSearchValidSchema';

const AdvSearch = ({ toggleState, petType }) => {
  const dispatch = useDispatch();
  const [petStatus, setPetStatus] = useState('')
  const formik = useFormik({
    initialValues: {
      maxWeight: '',
      maxHeight: '',
      minHeight: '',
      minWeight: '',
      petName: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      const {petName, minWeight, maxWeight, minHeight, maxHeight} = values;
      if (petStatus.length !== 0){
        const data = await AdvSearchPet({petType, petStatus, petName, minWeight, maxWeight, minHeight, maxHeight})
        if(data.length === 0 ){
          toast.error("We Couldn't find any pet matching the search criteria")
          dispatch(clear())
          return
        }
        dispatch(setResults(data))
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form-wrapper-search" style={{ display: `${toggleState ? 'flex' : 'none'}` }}>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Adoption Status</InputLabel>
        <Select
          style={{ width: '200px' }}
          label="Adoption Status"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={petStatus}
          onChange={e => setPetStatus(e.target.value)}
        >
          <MenuItem value={'Available'}>Available</MenuItem>
          <MenuItem value={'Adopted'}>Adopted</MenuItem>
          <MenuItem value={'Fostered'}>Fostered</MenuItem>
        </Select>
      </FormControl>
      <TextField
        style={{ width: '200px', margin: '10px' }}
        name="petName"
        label="Name"
        value={formik.values.petName}
        onChange={formik.handleChange}
        error={formik.touched.petName && Boolean(formik.errors.petName)}
        helperText={formik.touched.petName && formik.errors.petName}
      />
      <div>
        <TextField
          style={{ margin: '10px' }}
          name="minHeight"
          label="Min Height in CM"
          value={formik.values.minHeight}
          onChange={formik.handleChange}
          error={formik.touched.minHeight && Boolean(formik.errors.minHeight)}
          helperText={formik.touched.minHeight && formik.errors.minHeight}
        />
        <TextField
          style={{ margin: '10px' }}
          name="maxHeight"
          label="Max Height in CM"
          value={formik.values.maxHeight}
          onChange={formik.handleChange}
          error={formik.touched.maxHeight && Boolean(formik.errors.maxHeight)}
          helperText={formik.touched.maxHeight && formik.errors.maxHeight}
        />
      </div>
      <div>
        <TextField
          style={{ margin: '10px' }}
          name="minWeight"
          label="Min Weight in Gr"
          value={formik.values.minWeight}
          onChange={formik.handleChange}
          error={formik.touched.minWeight && Boolean(formik.errors.minWeight)}
          helperText={formik.touched.minWeight && formik.errors.minWeight}
        />
        <TextField
          style={{ margin: '10px' }}
          name="maxWeight"
          label="Max Weight in Gr"
          value={formik.values.maxWeight}
          onChange={formik.handleChange}
          error={formik.touched.maxWeight && Boolean(formik.errors.maxWeight)}
          helperText={formik.touched.maxWeight && formik.errors.maxWeight}
        />
      </div>
      <Button style={{ width: '10%' }} color="primary" variant="contained" type="submit">
        Adv Search
      </Button>
    </form>
  )
}

export default AdvSearch
