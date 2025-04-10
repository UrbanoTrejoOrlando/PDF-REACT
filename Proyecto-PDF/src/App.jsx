import React from 'react'
import Formulario from './Formulario/Formulario'
import { ProductProvider } from './context/ProductContext'

import "./index.css"



const App = () => {
  return (
    <ProductProvider>
      <Formulario/>
    </ProductProvider>
  )
} 

export default App
