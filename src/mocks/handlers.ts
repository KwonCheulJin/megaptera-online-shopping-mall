// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { ProductSummary } from '../types';

import fixtures from '../../fixtures';

const API_BASE_URL = process.env.API_BASE_URL
                     || 'https://shop-demo-api-03.fly.dev';

const productSummaries: ProductSummary[] = fixtures.products
  .map((product) => ({
    id: product.id,
    category: product.category,
    thumbnail: product.images[0],
    name: product.name,
    price: product.price,
  }));

const handlers = [
  rest.get(`${API_BASE_URL}/users/me`, (req, res, ctx) => (
    res(ctx.status(201))
  )),
  rest.get(`${API_BASE_URL}/categories`, (req, res, ctx) => (
    res(ctx.json({ categories: fixtures.categories }))
  )),
  rest.get(`${API_BASE_URL}/products`, (req, res, ctx) => {
    const categoryId = req.url.searchParams.get('categoryId');

    if (categoryId) {
      return res(ctx.json({
        products: productSummaries
          .filter((product) => product.category.id === categoryId),
      }));
    }
    return res(ctx.json({ products: productSummaries }));
  }),
  rest.get(`${API_BASE_URL}/products/:id`, (req, res, ctx) => {
    const product = fixtures.products.find((i) => i.id === req.params.id);
    if (!product) {
      return res(ctx.status(404));
    }
    return res(ctx.json(product));
  }),
  rest.get(`${API_BASE_URL}/cart`, (req, res, ctx) => (
    res(ctx.json(fixtures.cart))
  )),
  rest.post(`${API_BASE_URL}/cart/line-items`, (req, res, ctx) => (
    res(ctx.status(201))
  )),
  rest.get(`${API_BASE_URL}/orders`, (req, res, ctx) => (
    res(ctx.status(201), ctx.json({ orders: fixtures.orders }))
  )),
  rest.get(`${API_BASE_URL}/orders/:id`, (req, res, ctx) => {
    const order = fixtures.orders.find((i) => i.id === req.params.id);
    if (!order) {
      return res(ctx.status(404));
    }
    return res(ctx.status(201), ctx.json(order));
  }),
  rest.post(`${API_BASE_URL}/session`, (req, res, ctx) => {
    res(ctx.status(201));
    return res(ctx.json({ accessToken: 'Access-Token' }));
  }),
  rest.delete(`${API_BASE_URL}/session`, (req, res, ctx) => (
    res(ctx.status(201))
  )),
  rest.post(`${API_BASE_URL}/users`, (req, res, ctx) => (
    res(ctx.status(201), ctx.json({ accessToken: 'Access-Token' }))
  )),
];

export default handlers;
