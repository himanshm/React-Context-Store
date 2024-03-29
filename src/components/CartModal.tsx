import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import { CartItem } from './Cart';

type CartModalProps = {
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (id: string, quantityChange: number) => void;
  title: string;
  actions: ReactNode;
};

export type CartModalRef = {
  open: () => void;
};

const CartModal = forwardRef<CartModalRef, CartModalProps>(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current?.showModal();
    },
  }));

  return createPortal(
    <dialog id='modal' ref={dialog}>
      <h2>{title}</h2>
      <Cart onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method='dialog' id='modal-actions'>
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default CartModal;
