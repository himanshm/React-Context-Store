import Product from './Product.tsx';
import { DUMMY_PRODUCTS } from '../utils/dummy-products.ts';

type ProductType = {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
};

type ShopProps = {
  onAddItemToCart: (id: string) => void;
};

const Shop = ({ onAddItemToCart }: ShopProps) => {
  return (
    <section id='shop'>
      <h2>Elegant Clothing For Everyone</h2>

      <ul id='products'>
        {DUMMY_PRODUCTS.map((product: ProductType) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Shop;
