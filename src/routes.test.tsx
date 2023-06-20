import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { rest } from 'msw';
import defaultTheme from './styles/defaultTheme';

import routes from './routes';

import fixtures from '../fixtures';
import server from './mocks/server';

const API_BASE_URL = process.env.API_BASE_URL
                     || 'https://shop-demo-api-03.fly.dev';
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
  context('when the current path is “/login”', () => {
    it('로그인 페이지 렌더링', async () => {
      renderRouter('/login');

      screen.getByRole('heading', { name: '로그인' });

      await waitFor(() => {
        screen.getAllByText(/Category #1/);
      });

      fireEvent.change(screen.getByLabelText('E-mail'), {
        target: { value: 'newbie@example.com' },
      });

      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText(/Cart/);
      });
    });
  });
  context('when the current path is “/signup”', () => {
    it('회원가입 페이지 렌더링', async () => {
      renderRouter('/signup');

      screen.getByRole('heading', { name: '회원 가입' });

      fireEvent.change(screen.getByLabelText('E-mail'), {
        target: { value: 'newbie123@example.com' },
      });

      fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: 'Newbie' },
      });

      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password' },
      });

      fireEvent.change(screen.getByLabelText('Password Confirmation'), {
        target: { value: 'password' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원 가입' }));

      await waitFor(() => {
        screen.getByText(/회원 가입이 완료되었습니다./);
      });
    });
  });
  context('when the current path is “/signup”', () => {
    it('회원가입 페이지에서 회원가입 실패', async () => {
      server.use(
        rest.post(`${API_BASE_URL}/users`, (req, res, ctx) => (
          res(ctx.status(400))
        )),
      );
      renderRouter('/signup');

      screen.getByRole('heading', { name: '회원 가입' });

      fireEvent.change(screen.getByLabelText('E-mail'), {
        target: { value: 'newbie123@example.com' },
      });

      fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: 'Newbie' },
      });

      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password2' },
      });

      fireEvent.change(screen.getByLabelText('Password Confirmation'), {
        target: { value: 'password2' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원 가입' }));

      await waitFor(() => {
        screen.getByText(/회원 가입 실패/);
      });
    });
  });
  context('when the current path is “/orders”', () => {
    it('주문 목록 페이지 렌더링', async () => {
      renderRouter('/orders');

      await waitFor(() => {
        screen.getAllByText(/Category #1/);
      });

      expect(screen.getByRole('heading', { name: '주문 목록' })).toBeInTheDocument();
    });
  });
  context('when the current path is “/orders/order-01”', () => {
    it('주문 목록 페이지 렌더링', async () => {
      renderRouter('/orders/order-01');

      await waitFor(() => {
        screen.getAllByText(/Category #1/);
      });

      expect(screen.getByText('주문 일시')).toBeInTheDocument();
      expect(screen.getByText('주문 코드')).toBeInTheDocument();
      expect(screen.getByText('합계')).toBeInTheDocument();
    });
  });
  context('when the current path is “/order”', () => {
    it('주문 페이지 렌더링', async () => {
      renderRouter('/order');

      await waitFor(() => {
        screen.getAllByText(/Category #1/);
      });

      expect(screen.getByRole('heading', { name: '주문' })).toBeInTheDocument();
    });
  });
  context('when the current path is “/order/complete”', () => {
    it('주문 완료 페이지 렌더링', async () => {
      renderRouter('/order/complete');

      await waitFor(() => {
        screen.getAllByText(/Category #1/);
      });

      expect(screen.getByText(/주문이 완료되었습니다./)).toBeInTheDocument();
    });
  });
});
