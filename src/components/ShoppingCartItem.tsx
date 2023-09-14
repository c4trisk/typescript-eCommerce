import { Link } from 'react-router-dom'
import { Product } from "../types"
import { useCartContext } from "../hooks/useCartContext"

interface ShoppingCartItemProps {
  product: Product
  quantity: number
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ product, quantity }) => {

  const { addToCart, removeFromCart } = useCartContext()


  const handleDecrease = (id: string) => {
    removeFromCart(id)
  }

  const handleIncrease = (product: Product) => {
    addToCart({ product, quantity: 1 });
  };

  return (
    <Link to={`/products/${product.id}`} className="ShoppingCartItem">
      <div className="product">
        <img src={product.imageURL} alt={product.name} className="thumbnail" />
        <p>{product.name}</p>
      </div>
      <div className="quantity">
        <button className="btn-sm" onClick={() => handleDecrease(product.id)}>&lt;</button>
        <p>{quantity}</p>
        <button className="btn-sm" onClick={() => handleIncrease(product)}>&gt;</button>
      </div>
    </Link>
  )
}

export default ShoppingCartItem