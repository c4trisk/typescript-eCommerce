const API_ENDPOINT: string = 'http://localhost:3000/products/'

export const fetchProductById = async (id: string) => {
  try {
    const res = await fetch(API_ENDPOINT + id)

    if(!res.ok) throw new Error('Could not fetch data')

    const data = await res.json()
    return data
    
  } catch (err) {
    console.log('Error fetching products: ', err)
    return null
  }
}