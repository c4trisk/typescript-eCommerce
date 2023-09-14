import ProductListItem from "./ProductListItem"
import { useProductContext } from "../hooks/useProductContext";

const ProductList = () => {

  const { products } = useProductContext(); 

  return (
    <div className="ProductList">
      { products.map(product => <ProductListItem key={product.id} product={product}/>) }
    </div>
  )
}

export default ProductList