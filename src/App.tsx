import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetails'
import AddProduct from './pages/AddProduct'
import './App.css'
import Checkout from './pages/Checkout'

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route index element={ <Home /> } />
          <Route path='/products/:id' element={ <ProductDetail /> } />
          <Route path='/add' element={ <AddProduct /> } />
          <Route path='/checkout' element={ <Checkout /> } />
        </Routes>
      </div>
    </>
  )
}

export default App