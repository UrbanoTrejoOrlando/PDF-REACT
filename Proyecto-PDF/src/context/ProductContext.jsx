import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};    

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000');  // Asegúrate de que la URL esté correcta
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const productsResponse = await response.json();
      setProducts(productsResponse);

      const uniqueCategories = [...new Set(productsResponse.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  const datosCompartidos = {
    products,
    categories,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={datosCompartidos}>
      {children}
    </ProductContext.Provider>
  );
};