import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  it('renders product name, price, and image', () => {
    render(
      <ProductCard
        name="Masala Chai"
        price={450}
        image="/assets/masala.png"
        onAddToCart={jest.fn()}
      />
    );
    expect(screen.getByTestId('product-name')).toHaveTextContent('Masala Chai');
    expect(screen.getByTestId('product-price')).toHaveTextContent('₹450');
    expect(screen.getByTestId('product-image')).toHaveAttribute(
      'src',
      '/assets/masala.png'
    );
  });

  it('calls onAddToCart when Add to Cart is clicked', async () => {
    const user = userEvent.setup();
    const onAddToCart = jest.fn();
    render(
      <ProductCard
        name="Elaichi"
        price={400}
        image="/e.png"
        onAddToCart={onAddToCart}
      />
    );
    await user.click(screen.getByTestId('add-to-cart'));
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });
});
