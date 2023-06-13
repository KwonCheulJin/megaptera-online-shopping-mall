import { container as iocContainer } from 'tsyringe';
import fixtures from '../../../../fixtures';
import { render } from '../../../utils/test-helpers';
import Price from './Price';
import ProductFormStore from '../../../stores/ProductFormStore';
import numberFormat from '../../../utils/numberFormat';

const context = describe;

const [product] = fixtures.products;

jest.mock('../../../hooks/useProductDetailStore', () => () => [
  {
    product,
  },
]);
describe('Price', () => {
  context('Product #1 수량을 두개로 늘리면', () => {
    const quantity = 2;
    beforeEach(() => {
      const productFormStore = iocContainer.resolve(ProductFormStore);

      productFormStore.changeQuantity(quantity);
    });
    it('금액이 256,000원이 된다.', () => {
      const { container } = render(<Price />);

      const price = numberFormat(product.price * quantity);

      expect(container).toHaveTextContent(`${price}원`);
    });
  });
});
