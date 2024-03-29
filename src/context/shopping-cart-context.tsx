import { createContext, ReactNode, useReducer } from 'react';

import { DUMMY_PRODUCTS } from '../utils/dummy-products';

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

export const CartContext = createContext<CartContextType | null>(null);

type CartContextProviderProps = {
  children: ReactNode;
};

const initialState: CartState = {
  items: [],
};

type AddToCartAction = {
  type: 'ADD_ITEM';
  payload: string;
};

type UpdateCartAction = {
  type: 'UPDATE_ITEM';
  payload: { productId: string; amount: number };
};

type CartAction = AddToCartAction | UpdateCartAction;

function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );

      if (product) {
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...state, // Not needed here because we have only one state value
        items: updatedItems,
      };
    }
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  return state;
}

function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  function handleAddItemToCart(id: string) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    cartDispatch({
      type: 'UPDATE_ITEM',
      payload: { productId, amount },
    });
  }

  const cartContextValue: CartContextType = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
