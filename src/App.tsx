import { useState } from 'react';

import Header from './components/Header';
import Shop from './components/Shop';
import { DUMMY_PRODUCTS } from './utils/dummy-products.ts';
import { ProductType } from './utils/dummy-products.ts';
import Product from './components/Product.tsx';
import {
  CartContext,
  type CartContextType,
} from './context/shopping-cart-context.tsx';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type ShoppingCart = {
  items: CartItem[];
};

function App() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({
    items: [],
  });

  function handleAddItemToCart(id: string) {
    setShoppingCart((prevShoppingCart: ShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        if (product) {
          updatedItems.push({
            id: id,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    setShoppingCart((prevShoppingCart: ShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const cartContextValue: CartContextType = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
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
    </CartContext.Provider>
  );
}

export default App;
