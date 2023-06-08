import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../../../utils/test-helpers';
import Quantity from './Quantity';

const context = describe;

const store = {
  quantity: 7,
  changeQuantity: jest.fn(),
};

jest.mock('../../../hooks/useProductFormStore', () => () => [store, store]);
describe('Quantity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderQuantity() {
    render(<Quantity />);
  }
  it('렌더링 되었을 때', () => {
    renderQuantity();

    expect(screen.getByRole('textbox')).toHaveValue('7');
  });

  context('"+"버튼을 클릭하면', () => {
    it('수량이 증가한다.', async () => {
      renderQuantity();

      fireEvent.click(screen.getByRole('button', { name: '+' }));

      await waitFor(() => {
        expect(store.changeQuantity).toBeCalledWith(7 + 1);
      });
    });
  });
});
