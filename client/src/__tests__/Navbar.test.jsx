import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { supabase } from '../utils/supabaseClient';

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
    jest.clearAllMocks();
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    supabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    });
  });

  it('renders navigation links', async () => {
    renderNav(<Navbar />);
    expect(await screen.findByTestId('nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('nav-products')).toBeInTheDocument();
    expect(screen.getByTestId('nav-cart')).toBeInTheDocument();
    expect(screen.getByTestId('nav-login')).toBeInTheDocument();
  });

  it('shows user name and logout when authenticated', async () => {
    const mockUser = {
      id: '123',
      email: 'tea@fatafat.test',
      user_metadata: { full_name: 'Chai Lover' },
    };
    const mockSession = { access_token: 'fake-jwt', user: mockUser };

    supabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    const user = userEvent.setup();
    renderNav(<Navbar />);

    expect(await screen.findByTestId('nav-user-name')).toHaveTextContent(
      'Chai Lover'
    );
    expect(screen.getByTestId('nav-logout')).toBeInTheDocument();

    await user.click(screen.getByTestId('nav-logout'));
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });
});
