import {render, waitForElement} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';


function renderWithProviders(
  ui,
  {
    route = '/line/Red',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {},
) {
  return {
    ...render(<>{ui}</>),
    history
  };
}

test('App renders with header', () => {
  const { container } = render(
   <MemoryRouter initialentries={['/']}>
      <App/>
    </MemoryRouter>
  );
  const header = container.querySelector('.App-header');
  expect(container.firstChild).toHaveClass('App');
  expect(header).toBeInTheDocument();
  expect(header.textContent).toBe('MBTA App');
});

test('App renders Line Selector by default', () => {
  const { container } = render(
   <MemoryRouter initialentries={['/']}>
      <App/>
    </MemoryRouter>
  );

  const headline = container.querySelector('h1');

  expect(headline).toBeInTheDocument();
  expect(headline.textContent).toBe('Choose a line:');
});

test('App renders Stop Selector when url params set', async () => {
  const {container} = render(
   <MemoryRouter initialEntries={['/line/Red']} initialIndex={0}>
      <App/>
    </MemoryRouter>
  );

  const headline = container.querySelector('h1');

  expect(headline).toBeInTheDocument();
  expect(headline.textContent).toBe('Red Line');
});