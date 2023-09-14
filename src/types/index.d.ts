type ProductCategory = 'FASHION' | 'ELECTRONICS' | 'INTERIOR'

interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  description: string;
  imageURL: string;
  price: number;
}

interface FashionProduct extends Product {
  size: string;
  color: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}



export type { ProductCategory, Product, FashionProduct, CartItem }