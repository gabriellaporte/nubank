import { SellOperationStrategy } from '@/app/application/strategies';
import { Operation, Portfolio } from '@/app/domain/value-objects';
import { TaxCalculator } from '@/app/domain/domain-services/tax-calculator';

jest.mock('@/app/domain/domain-services/tax-calculator'); // Mocking TaxCalculator

describe('SellOperationStrategy', () => {
  let sut: SellOperationStrategy;
  let portfolio: Portfolio;

  beforeEach(() => {
    sut = new SellOperationStrategy();
    portfolio = new Portfolio();

    jest.resetAllMocks();
  });

  describe('handle', () => {
    it('should accumulate loss and return tax as 0.0 for a sale with negative net proceeds', () => {
      portfolio.updateAveragePrice(10, 100);
      const operation = new Operation('sell', 5, 50);

      const result = sut.handle(operation, portfolio);

      expect(result.tax).toBe(0.0);
      expect(portfolio.getLosses()).toBe(250);
      expect(portfolio.getTotalQuantity()).toBe(50);
    });

    it('should calculate tax for a sale with positive net proceeds', () => {
      (TaxCalculator.calculateTax as jest.Mock).mockReturnValue(200.0);
      portfolio.updateAveragePrice(10, 100);
      const operation = new Operation('sell', 20, 50);

      const result = sut.handle(operation, portfolio);

      expect(result.tax).toBe(200.0);
      expect(portfolio.getLosses()).toBe(0);
      expect(portfolio.getTotalQuantity()).toBe(50);
    });

    it('should deduct losses from profit before calculating tax', () => {
      (TaxCalculator.calculateTax as jest.Mock).mockReturnValue(100.0);
      portfolio.updateAveragePrice(10, 100);
      portfolio.accumulateLoss(500);
      const operation = new Operation('sell', 20, 50);

      const result = sut.handle(operation, portfolio);

      expect(result.tax).toBe(100.0);
      expect(portfolio.getLosses()).toBe(0);
      expect(portfolio.getTotalQuantity()).toBe(50);
    });

    it('should not calculate tax for sales below tax exemption threshold', () => {
      portfolio.updateAveragePrice(10, 100);
      const operation = new Operation('sell', 11, 50);

      (TaxCalculator.calculateTax as jest.Mock).mockReturnValue(0.0);

      const result = sut.handle(operation, portfolio);

      expect(result.tax).toBe(0.0);
      expect(portfolio.getLosses()).toBe(0);
      expect(portfolio.getTotalQuantity()).toBe(50);
    });
  });
});
