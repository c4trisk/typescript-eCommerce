import { Link } from 'react-router-dom'
import { Product } from "../types";


interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    product && (

    <Link to={`/products/${product.id}`} className="ProductListItem">
      <img src={product.imageURL} alt={product.name} className="img" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">$ {product.price.toFixed(2)}</p>
    </Link>
    )

  )
}

export default ProductListItem