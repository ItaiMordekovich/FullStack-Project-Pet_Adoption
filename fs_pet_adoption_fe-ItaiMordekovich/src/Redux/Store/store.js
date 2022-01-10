import { configureStore } from '@reduxjs/toolkit'
import SearchedPetsReducer from '../Reducers/SearchedPets.reducer'
import UserAuthReducer  from '../Reducers/User.reducer'

export const store = configureStore({
  reducer: {
    searchedPets: SearchedPetsReducer,
    userData: UserAuthReducer
  },
})