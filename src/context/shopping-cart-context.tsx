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
};

const defaultCartContext: CartContextType = {
  items: [],
  addItemToCart: () => {}, // Provide a no-op function or suitable default implementation
};

export const CartContext = createContext<CartContextType>(defaultCartContext);
