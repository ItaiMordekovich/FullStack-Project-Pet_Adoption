import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pets: [],
}

export const searchedPetsSlice = createSlice({
  name: 'searchedPets',
  initialState,
  reducers: {
    clear: (state) => {
      state.pets = []
    },
    setResults: (state, action) => {
      state.pets = [...action.payload]
    },
 
  },
})

// Action creators are generated for each case reducer function
export const { clear, setResults } = searchedPetsSlice.actions

export default searchedPetsSlice.reducer