import { useNavigate } from 'react-router-dom'
import ShoppingCartItem from "./ShoppingCartItem"
import { useCartContext } from "../hooks/useCartContext"

const ShoppingCart = () => {

  const navigate = useNavigate()
  const { cart, clearCart, getTotalAmount, toggleCartVisibility } = useCartContext()

  const handleCheckout = () => {
    clearCart()
    toggleCartVisibility()
    navigate('/checkout')
  }

  return (
    <div className="ShoppingCart">
      { cart.length === 0
        ? <p>The Shopping Cart is empty.</p>
        : cart.map(item => (
          <ShoppingCartItem 
            key={item.product.id} 
            product={item.product}
            quantity={item.quantity}
          />
      )) }
      <p className="amount">Total amount: $ {getTotalAmount().toFixed(2)}</p>
      <div className="buttons">
        <button className="btn btn-clear" onClick={() => clearCart()}>Clear Cart</button>
        <button className="btn btn-buy" onClick={handleCheckout}>To Checkout</button>
      </div>
    </div>
  )
}

export default ShoppingCart