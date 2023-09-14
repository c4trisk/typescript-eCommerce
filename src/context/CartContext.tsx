import { ReactNode, createContext, useEffect, useState } from 'react'
import { CartItem } from '../types'

export interface CartContextType {
  cart: CartItem[];
  isCartVisible: boolean;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
  toggleCartVisibility: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode; // Define children prop explicitly
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false)

  //* Load cart data from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if(savedCart) {
      setCart((prevCart) => [...prevCart, ...JSON.parse(savedCart)])
    }
  }, [])

  //* Save cart data to localStorage upon changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  //* Function for adding to cart
  const addToCart = (product: CartItem) => {

    // Checking if product is already in the cart and updating quantity
    const existingProductIndex = cart.findIndex(item => item.product.id === product.product.id)
    if(existingProductIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart[existingProductIndex].quantity += product.quantity
      setCart(updatedCart)
    } else {
      // if not - add product to cart
      setCart([...cart, product])
    }
  }

  //* Function for removing from cart
  const removeFromCart = (productId: string) => {

    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex(item => item.product.id === productId)

    // Reduces quantity by 1, or removes item if quantity goes below 1
    if(itemIndex !== -1) {
      if(updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex].quantity -= 1
      } else {
        updatedCart.splice(itemIndex, 1)
      }
      setCart(updatedCart)
    }
  }
  

  //* Function for clearing cart
  const clearCart = () => {
    setCart([])
  }

  //* Function to get total quantity of items in shopping cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  //* Function for getting total amount of cart
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * item.product.price, 0) 
  }

  //* Toggle shopping cart visibility
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible)
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      isCartVisible,
      addToCart, 
      removeFromCart, 
      clearCart, 
      getTotalItems, 
      getTotalAmount,
      toggleCartVisibility 
      }}>
      { children }
    </CartContext.Provider>
  )
}