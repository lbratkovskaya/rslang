import getRandomNumber from './utils';

describe('Utils testing:', () => {
  it('getRandomNumber() should return a defined value', () => {
    expect(getRandomNumber(1234)).toBeDefined();
  });

  it('getRandomNumber() should be less than or equal passed argument', () => {
    Array(500)
      .fill(null)
      .map((el, index) => index)
      .map((num) => expect(getRandomNumber(num)).toBeLessThanOrEqual(num));
  });
});
