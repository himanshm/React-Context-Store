import { createContext } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
};

const cartContextValue: CartContextType = {
  items: [],
};

export const CartContext = createContext(cartContextValue);
