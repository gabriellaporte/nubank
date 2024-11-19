import { BuyOperationStrategy } from '@/app/application/strategies';
import { Operation, Portfolio } from '@/app/domain/value-objects';

describe('BuyOperationStrategy', () => {
  let sut: BuyOperationStrategy;
  let portfolio: Portfolio;

  beforeEach(() => {
    sut = new BuyOperationStrategy();
    portfolio = new Portfolio();
  });

  describe('handle', () => {
    it('should update the portfolio average price and quantity for a buy operation', () => {
      const operation = new Operation('buy', 10, 100);

      sut.handle(operation, portfolio);

      expect(portfolio.getAveragePrice()).toBe(10);
      expect(portfolio.getTotalQuantity()).toBe(100);
    });

    it('should update the portfolio with a weighted average price after multiple buy operations', () => {
      const firstOperation = new Operation('buy', 10, 100);
      const secondOperation = new Operation('buy', 20, 50);

      sut.handle(firstOperation, portfolio);
      sut.handle(secondOperation, portfolio);

      expect(portfolio.getAveragePrice()).toBeCloseTo(13.33, 2);
      expect(portfolio.getTotalQuantity()).toBe(150);
    });

    it('should return tax as 0.0 for any buy operation', () => {
      const operation = new Operation('buy', 10, 100);

      const result = sut.handle(operation, portfolio);

      expect(result.tax).toBe(0.0);
    });
  });
});
