import { useRef } from 'react';
import CartModal from './CartModal';
import { CartModalRef } from './CartModal';

import logoImg from '../assets/logo.png';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Cart = {
  items: CartItem[];
};

type HeaderProps = {
  cart: Cart;
  onUpdateCartItemQuantity: (id: number, quantityChange: number) => void;
};

const Header = ({ cart, onUpdateCartItemQuantity }: HeaderProps) => {
  const modalRef = useRef<CartModalRef>(null);

  const cartQuantity = cart.items.length;

  function handleOpenCartClick() {
    modalRef.current?.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modalRef}
        cartItems={cart.items}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title='Your Cart'
        actions={modalActions}
      />
      <header id='main-header'>
        <div id='main-title'>
          <img src={logoImg} alt='Elegant model' />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
};

export default Header;
