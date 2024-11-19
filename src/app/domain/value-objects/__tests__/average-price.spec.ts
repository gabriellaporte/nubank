import { AveragePrice } from '../average-price';

describe('AveragePrice', () => {
  let sut: AveragePrice;

  beforeEach(() => {
    sut = new AveragePrice();
  });

  describe('update', () => {
    it('should set the value to unitCost when totalQuantity is 0', () => {
      sut.update(10, 100, 0);

      expect(sut.getValue()).toBe(10);
    });

    it('should calculate the weighted average price correctly', () => {
      sut.update(10, 100, 100);
      expect(sut.getValue()).toBe(10);

      sut.update(20, 50, 150);
      expect(sut.getValue()).toBeCloseTo(13.33, 2);
    });

    it('should handle a single operation correctly', () => {
      sut.update(15, 200, 200);

      expect(sut.getValue()).toBe(15);
    });

    it('should calculate correctly when adding more quantity to an existing average', () => {
      sut.update(10, 100, 100);
      sut.update(15, 300, 400);

      expect(sut.getValue()).toBeCloseTo(13.75, 2);
    });
  });

  describe('getValue', () => {
    it('should return the current average price value', () => {
      expect(sut.getValue()).toBe(0);

      sut.update(10, 100, 100);
      expect(sut.getValue()).toBe(10);

      sut.update(20, 50, 150);
      expect(sut.getValue()).toBeCloseTo(13.33, 2);
    });
  });
});
