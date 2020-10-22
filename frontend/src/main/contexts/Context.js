import React, { createContext, useState } from 'react'

export const appContext = createContext()

export const AppProvider = ({children}) => {

    const [currentCustomer, setCurrentCustomer] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [currentUserLogged, setCurrentUserLogged] = useState({})

    const state = {
        currentCustomer,
        setCurrentCustomer,
        editMode,
        setEditMode,
        currentUserLogged,
        setCurrentUserLogged
    }

    return (
        <appContext.Provider value={{...state}}>
            {children}
        </appContext.Provider>
    )
}

export default AppProvider