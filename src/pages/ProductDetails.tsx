import { useParams } from 'react-router-dom'
import { useProductContext } from '../hooks/useProductContext'
import { useCartContext } from '../hooks/useCartContext'
import { useEffect, useState } from 'react'
import { Product } from '../types'

const ProductDetail = () => {

  const { findProductById } = useProductContext()
  const { addToCart } = useCartContext()
  const [product, setProduct] = useState<Product | null>(null)

  // Getting product id from URL
  const { id } = useParams()
  if (!id) throw new Error('id not found.')
  

  // Fetching product
  const fetchProduct = async () => {
    try {
      const product = await findProductById(id);
      if (!product) throw new Error('Product not found.');

      setProduct(product)

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);


  return (
    <div className='ProductDetails'>
      {
        product 
        ? <>
          <small className='category'>{product.category}</small>
          <h1 className='name'>{product.name}</h1>
          <p className='description'>{product.description}</p>
          <div className="img">
            <img src={product.imageURL} alt={product.name} />
          </div>
          <h2 className='price'>$ {product.price.toFixed(2)}</h2>
          <button className="btn btn-buy" onClick={() => addToCart({product, quantity: 1})}>Buy Now</button>
        </>
        : <p>Product Not Found</p>
      }
    </div>
  )
}

export default ProductDetail