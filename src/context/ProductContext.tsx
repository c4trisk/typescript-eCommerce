import React, { ReactNode, createContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../api/fetchProducts';
import { fetchProductById } from '../api/fetchProductbyId';
import { createProduct } from '../api/createProduct';

// Define the shape of context
export interface ProductContextType {
  products: Product[];
  findProductById: (productId: string) => Promise<Product | null>;
  addProduct: (newProduct: Product) => Promise<void>
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode; 
}


export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {

  const [products, setProducts] = useState<Product[]>([]); 

  // Fetching products and storing in products array
  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
  }, [])

  
  // Function to find a product by ID
  const findProductById = async (id: string): Promise<Product | null> => {
    try {
      const product = await fetchProductById(id)
      if(!product) throw new Error('Product not found')
      
      return product
    } catch (err) {
      console.log('Error fetching product by ID: ', err)  
      return null
    }
  }

  const addProduct = async (newProduct: Product) => {
    try {
      const addedProduct = await createProduct(newProduct)

      // Update local state with new product
      setProducts([...products, addedProduct])
    } catch (err) {
      console.log('Error when adding product: ', err)
      throw err
    }
  }

  return (
    <ProductContext.Provider value={{ products, findProductById, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
