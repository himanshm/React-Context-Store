import { ReactNode } from 'react';

type ShopProps = {
  children: ReactNode;
};

const Shop = ({ children }: ShopProps) => {
  return (
    <section id='shop'>
      <h2>Elegant Clothing For Everyone</h2>

      {children}
    </section>
  );
};

export default Shop;
