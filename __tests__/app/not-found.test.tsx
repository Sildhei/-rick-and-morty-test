import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

describe('Error', () => {

  it('Si la URL no es correcta, se debe mostrar el componente de Page not found', async () => {
    const mockUrl = new URL('http://localhost:3001/wrongUrl');
    const expectedUrlPattern = /^http:\/\/localhost:3001\/?(\?page=\d+)?$/;
    if (!mockUrl.href.match(expectedUrlPattern)) {
      render(<NotFound />);
    }
    const notFoundElement = await screen.findByText('Oops! Page not found');
    expect(notFoundElement).toBeInTheDocument();
  });

});
