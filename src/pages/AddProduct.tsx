import { useState } from "react"
import { Product } from "../types"
import { useProductContext } from "../hooks/useProductContext"

const AddProduct = () => {

  const { addProduct } = useProductContext()

  const [formData, setFormData] = useState<Product>({
    id: crypto.randomUUID(),
    category: "ELECTRONICS",
    name: '',
    description: '',
    imageURL: '',
    price: 0
  })


  //* handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    // Making sure that price is submitted as number
    const parsedValue = name === 'price' ? parseFloat(value) : value
    setFormData({...formData, [name]: parsedValue})
  }

  //* handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addProduct(formData)
      setFormData({
        id: crypto.randomUUID(),
        category: "ELECTRONICS",
        name: '',
        description: '',
        imageURL: '',
        price: 0
      })
    } catch (err) {
      console.log('Error when adding product', err)
    }
  }

  return (
    <div className="AddProduct">

      <h1 className="title">Add a new Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="category">Product Category:</label>
          <select name="category" id="category" value={formData.category} onChange={handleChange}>
            <option value="ELECTRONICS">ELECTRONICS</option>
            <option value="FASHION">FASHION</option>
            <option value="INTERIOR">INTERIOR</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="name">Product Name:</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="description">Product Description:</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="imageURL">Product Image URL:</label>
          <input type="text" name="imageURL" id="imageURL" value={formData.imageURL} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="price">Product Price:</label>
          <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} />
        </div>
        <button className="btn btn-buy">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct