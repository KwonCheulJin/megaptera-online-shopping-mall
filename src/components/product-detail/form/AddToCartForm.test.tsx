import { container as iocContainer } from 'tsyringe';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import fixtures from '../../../../fixtures';
import ProductDetailStore from '../../../stores/ProductDetailStore';
import { render } from '../../../utils/test-helpers';
import AddToCartForm from './AddToCartForm';

const context = describe;

let accessToken = '';

jest.mock('../../../hooks/useAccessToken', () => () => ({
  get accessToken() {
    return accessToken;
  },
}));

describe('AddToCartForm', () => {
  const [product] = fixtures.products;

  beforeEach(async () => {
    iocContainer.clearInstances();

    const productDetailStore = iocContainer.resolve(ProductDetailStore);
    await productDetailStore.fetchProduct({ productId: product.id });
  });

  context("when the current user isn't logged in", () => {
    beforeEach(() => {
      accessToken = '';
    });

    it('renders message', () => {
      const { container } = render(<AddToCartForm />);

      expect(container).toHaveTextContent('주문하려면 로그인하세요');
    });
  });

  context('when the current user is logged in', () => {
    beforeEach(() => {
      accessToken = 'ACCESS-TOKEN';
    });

    it('renders “Add To Cart” button', async () => {
      render(<AddToCartForm />);

      fireEvent.click(screen.getByText('장바구니에 담기'));

      await waitFor(() => {
        screen.getByText(/장바구니에 담았습니다/);
      });
    });
  });
});
