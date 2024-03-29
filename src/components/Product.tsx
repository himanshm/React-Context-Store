import { useContext } from 'react';
import { CartContext } from '../context/shopping-cart-context';
import { ProductType } from '../utils/dummy-products';

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const { addItemToCart } = useContext(CartContext);
  const { id, image, title, price, description } = product;
  return (
    <article className='product'>
      <img src={image} alt={title} />
      <div className='product-content'>
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
};

export default Product;
