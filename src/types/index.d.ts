type ProductCategory = 'FASHION' | 'ELECTRONICS' | 'INTERIOR'

interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  description: string;
  imageURL: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}



export type { ProductCategory, Product, CartItem }