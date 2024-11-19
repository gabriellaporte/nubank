import { Portfolio } from '../';

describe('Portfolio', () => {
  let portfolio: Portfolio;

  beforeEach(() => {
    portfolio = new Portfolio();
  });

  describe('updateAveragePrice', () => {
    it('should update the average price correctly on the first buy', () => {
      portfolio.updateAveragePrice(10, 100);

      expect(portfolio.getAveragePrice()).toBe(10);
      expect(portfolio.getTotalQuantity()).toBe(100);
    });

    it('should calculate the weighted average price after multiple buys', () => {
      portfolio.updateAveragePrice(10, 100);
      portfolio.updateAveragePrice(20, 50);

      expect(portfolio.getAveragePrice()).toBeCloseTo(13.33, 2);
      expect(portfolio.getTotalQuantity()).toBe(150);
    });

    it('should throw an error if total quantity becomes negative', () => {
      expect(() => portfolio.updateTotalQuantity(-100)).toThrow(
        "You can't have negative stocks"
      );
    });
  });

  describe('calculateTaxableProfit', () => {
    it('should return 0 if profit is less than or equal to 0', () => {
      expect(portfolio.calculateTaxableProfit(-1000)).toBe(0);
      expect(portfolio.calculateTaxableProfit(0)).toBe(0);
    });

    it('should calculate taxable profit correctly when losses are available', () => {
      portfolio.accumulateLoss(500);
      const taxableProfit = portfolio.calculateTaxableProfit(1000);

      expect(taxableProfit).toBe(500);
    });

    it('should calculate taxable profit correctly when no losses are available', () => {
      const taxableProfit = portfolio.calculateTaxableProfit(1000);

      expect(taxableProfit).toBe(1000);
    });
  });

  describe('deductLosses', () => {
    it('should reduce the accumulated losses correctly', () => {
      portfolio.accumulateLoss(1000);
      portfolio.deductLosses(500);

      expect(portfolio.getLosses()).toBe(500);
    });

    it('should not reduce losses below 0', () => {
      portfolio.accumulateLoss(500);
      portfolio.deductLosses(1000);

      expect(portfolio.getLosses()).toBe(0);
    });
  });

  describe('accumulateLoss', () => {
    it('should accumulate losses correctly', () => {
      portfolio.accumulateLoss(500);
      portfolio.accumulateLoss(300);

      expect(portfolio.getLosses()).toBe(800);
    });
  });
});
