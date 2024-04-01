import { useContext } from 'react';
import { CartContext } from './shopping-cart-context';

export const useCartContext = function () {
  const cartContext = useContext(CartContext);

  if (cartContext === null) {
    throw new Error(
      'CartContext is null - that should not be the case! TimersContext was used outside the ContextProvider!'
    );
  }

  return cartContext;
};
