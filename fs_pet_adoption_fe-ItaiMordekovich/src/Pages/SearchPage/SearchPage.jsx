import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clear } from '../../Redux/Reducers/SearchedPets.reducer'
import SearchWrapper from './Components/SearchLogic/SearchWrapper'
import SearchQueryResult from './Components/SearchQueryResult/SearchQueryResult'

export default function SearchPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(clear())
        }
    }, [])
    
    return (
        <>
            <SearchWrapper/> 
            <SearchQueryResult/>
        </>
    )
}
