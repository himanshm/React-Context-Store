// Define the type for each item in the items array
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Define the type for the props that Cart component will receive
type CartProps = {
  items: CartItem[];
  onUpdateItemQuantity: (id: string, quantityChange: number) => void;
};

const Cart = ({ items, onUpdateItemQuantity }: CartProps) => {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id='cart'>
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id='cart-items'>
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className='cart-item-actions'>
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id='cart-total-price'>
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
};

export default Cart;
