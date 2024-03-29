import CartContextProvider from './context/shopping-cart-context.tsx';
import Header from './components/Header';
import Shop from './components/Shop';
import { DUMMY_PRODUCTS } from './utils/dummy-products.ts';
import { ProductType } from './utils/dummy-products.ts';
import Product from './components/Product.tsx';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        <ul id='products'>
          {DUMMY_PRODUCTS.map((product: ProductType) => (
            <li key={product.id}>
              <Product product={product} />
            </li>
          ))}
        </ul>
      </Shop>
    </CartContextProvider>
  );
}

export default App;
