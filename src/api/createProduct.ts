import { Product } from "../types"

const API_ENDPOINT: string = 'http://localhost:3000/products/'

export const createProduct = async(newProduct: Product) => {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct)
    })

    if(!res.ok) throw new Error('Failed to add data')

    return await res.json()

  } catch (err) {
    console.log('Error adding product: ', err)
    throw err
  }
}