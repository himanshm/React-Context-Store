import { createContext } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartContextType = CartState & {
  addItemToCart: (id: string) => void;
  updateItemQuantity: (id: string, amount: number) => void;
};

const defaultCartContext: CartContextType = {
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
};

export const CartContext = createContext<CartContextType>(defaultCartContext);
