import numberFormat from './numberFormat';

describe('numberFormat', () => {
  it('숫자 1000 단위 이상은 천의 자리에 콤마(,)가 붙는다', () => {
    expect(numberFormat(1)).toBe('1');
    expect(numberFormat(100)).toBe('100');
    expect(numberFormat(1000)).toBe('1,000');
    expect(numberFormat(123000)).toBe('123,000');
    expect(numberFormat(1234000)).toBe('1,234,000');
  });
});
