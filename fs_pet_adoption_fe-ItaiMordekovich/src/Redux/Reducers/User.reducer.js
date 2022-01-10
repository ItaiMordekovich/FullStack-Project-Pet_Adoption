import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
}

export const UserAuthSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: (state) => {
        Object.keys(state).forEach(key =>{
            delete state[key]
        })
      state.isAuth = false;
    },
    login: (state, action) => {
      console.log(action.payload)
      state.isAuth = true;
      state.userDetails = action.payload
    },
 
  },
})

// Action creators are generated for each case reducer function
export const { logout, login } = UserAuthSlice.actions

export default UserAuthSlice.reducer