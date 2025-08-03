import React, { createContext, useContext } from 'react'

const mainContext = createContext();
export const useMainContext = ()=>useContext(mainContext)

export const MainContextProvider = ({children}) => {
  return (
    <mainContext.Provider value={{}}>{children}</mainContext.Provider>
  )
}

export default MainContextProvider