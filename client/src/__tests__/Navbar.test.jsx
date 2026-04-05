import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

function renderNav(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <CartProvider>{ui}</CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [], subtotal: 0 }),
      })
    );
  });

  it('renders navigation links', () => {
    renderNav(<Navbar />);
    expect(screen.getByTestId('nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('nav-products')).toBeInTheDocument();
    expect(screen.getByTestId('nav-cart')).toBeInTheDocument();
    expect(screen.getByTestId('nav-login')).toBeInTheDocument();
  });

  it('shows user name and logout when authenticated', async () => {
    localStorage.setItem('fatafat-token', 'fake-jwt');
    localStorage.setItem(
      'fatafat-auth',
      JSON.stringify({ email: 'tea@fatafat.test', name: 'Chai Lover' })
    );
    const user = userEvent.setup();
    renderNav(<Navbar />);
    expect(await screen.findByTestId('nav-user-name')).toHaveTextContent(
      'Chai Lover'
    );
    expect(screen.getByTestId('nav-logout')).toBeInTheDocument();
    await user.click(screen.getByTestId('nav-logout'));
    expect(screen.getByTestId('nav-login')).toBeInTheDocument();
  });
});
