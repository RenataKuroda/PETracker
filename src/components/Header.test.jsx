import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

test('renders the header component', async () => {
  render(
    <Router>
      <Header />
    </Router>
  );

  await waitFor(() => {
    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeInTheDocument();
  });


});
