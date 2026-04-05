import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItem from '../components/CartItem';

describe('CartItem', () => {
  const baseProps = {
    name: 'Masala Chai',
    price: 100,
    quantity: 2,
    itemId: 'line-1',
    onQuantityChange: jest.fn(),
    onRemove: jest.fn(),
  };

  it('renders name, unit price, quantity, and line total', () => {
    render(<CartItem {...baseProps} />);
    expect(screen.getByTestId('cart-item-name')).toHaveTextContent(
      'Masala Chai'
    );
    expect(screen.getByTestId('cart-item-unit-price')).toHaveTextContent(
      '₹100 each'
    );
    expect(screen.getByTestId('cart-item-qty')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-item-line-total')).toHaveTextContent(
      '₹200'
    );
  });

  it('invokes onQuantityChange when +/- clicked', async () => {
    const user = userEvent.setup();
    const onQuantityChange = jest.fn();
    render(<CartItem {...baseProps} onQuantityChange={onQuantityChange} />);
    await user.click(screen.getByTestId('qty-increase'));
    expect(onQuantityChange).toHaveBeenCalledWith(3);
    await user.click(screen.getByTestId('qty-decrease'));
    expect(onQuantityChange).toHaveBeenCalledWith(1);
  });

  it('invokes onRemove when Remove clicked', async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();
    render(<CartItem {...baseProps} onRemove={onRemove} />);
    await user.click(screen.getByTestId('remove-item'));
    expect(onRemove).toHaveBeenCalledWith('line-1');
  });
});
