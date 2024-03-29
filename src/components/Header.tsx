import { useRef } from 'react';
import CartModal from './CartModal';
import { CartModalRef } from './CartModal';
import { useCartContext } from '../context/useCartContext';

import logoImg from '../assets/logo.png';

const Header = () => {
  const { items } = useCartContext();
  const modalRef = useRef<CartModalRef>(null);

  const cartQuantity = items.length;

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
      <CartModal ref={modalRef} title='Your Cart' actions={modalActions} />
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
