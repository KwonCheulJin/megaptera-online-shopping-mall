import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../utils/test-helpers';
import Options from './Options';
import fixtures from '../../../../fixtures';

const context = describe;

const [product] = fixtures.products;
const store = {
  product,
  selectedOptionItems: product.options.map((i) => i.items[0]),
  quantity: 1,
  changeOptionItem: jest.fn(),
};

jest.mock('../../../hooks/useProductFormStore', () => () => [store, store]);
describe('Options', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('렌더링', () => {
    render(<Options />);

    expect(screen.getAllByRole('combobox')).toHaveLength(product.options.length);
  });
  context('선택이 변경되었을 때', () => {
    it('"changeOptionItem"이 호출된다.', () => {
      render(<Options />);

      const [option] = product.options;
      const [, item] = option.items;

      const [combobox] = screen.getAllByRole('combobox');

      fireEvent.change(combobox, {
        target: { value: item.id },
      });

      expect(store.changeOptionItem).toBeCalledWith({
        optionId: option.id,
        optionItemId: item.id,
      });
    });
  });
});
