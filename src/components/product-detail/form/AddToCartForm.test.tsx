import { container } from 'tsyringe';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import fixtures from '../../../../fixtures';
import ProductDetailStore from '../../../stores/ProductDetailStore';
import { render } from '../../../utils/test-helpers';
import AddToCartForm from './AddToCartForm';

const context = describe;

describe('AddToCartForm', () => {
  beforeEach(() => {
    container.clearInstances();

    const [product] = fixtures.products;

    const productDetailStore = container.resolve(ProductDetailStore);

    productDetailStore.fetchProduct({ productId: product.id });
  });

  context('사용자가 장바구니에 담기를 클릭하면', () => {
    it('"장바구니에 담았습니다" 문구가 출력된다.', async () => {
      render(<AddToCartForm />);

      fireEvent.click(screen.getByText('장바구니에 담기'));

      await waitFor(() => {
        expect(screen.getByText('장바구니에 담았습니다')).toBeInTheDocument();
      });
    });
  });
});
