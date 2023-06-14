import { render, screen, waitFor } from '@testing-library/react';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import defaultTheme from './styles/defaultTheme';

import routes from './routes';

import fixtures from '../fixtures';

const context = describe;

describe('routes', () => {
  function renderRouter(path: string) {
    const router = createMemoryRouter(routes, { initialEntries: [path] });
    render((
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    ));
  }

  context('when the current path is “/”', () => {
    it('renders the home page', async () => {
      renderRouter('/');
      await waitFor(() => {
        screen.getAllByText(/Category #1/);
      });
    });
  });

  context('when the current path is “/products”', () => {
    it('category ID가 없을 때', async () => {
      renderRouter('/products');
      await waitFor(() => {
        screen.getByText(/Product #1/);
      });
    });
    it('category ID가 있을 때', async () => {
      renderRouter(`/products?categoryId=${fixtures.categories[1].id}`);
      await waitFor(() => {
        screen.getByText(/Product #2/);
      });
    });
  });

  context('when the current path is “/products/{id}”', () => {
    // TODO #1: 상품 ID일 때
    it('product ID가 있을 때', async () => {
      renderRouter(`/products/${fixtures.products[0].id}`);
      screen.getByText(/Loading/);
      await waitFor(() => {
        screen.getAllByText(/Product #1/);
      });
    });
    // TODO #2: 상품 ID가 올바르지 않을 때
    it('product ID가 올바르지 않을 때', async () => {
      renderRouter('/products/product-03');
      screen.getByText(/Loading/);
      await waitFor(() => {
        screen.getAllByText(/Error/);
      });
    });
  });

  context('when the current path is “/cart”', () => {
    // TODO: cart 페이지 라우팅 테스트
    it('카트 페이지 렌더링', async () => {
      renderRouter('/cart');

      await waitFor(() => {
        screen.getAllByText(/장바구니/);
      });
    });
  });
});
