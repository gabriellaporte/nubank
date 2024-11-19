import { TaxCalculator } from '../tax-calculator';
import { TAX_EXEMPTION, TAX_RATE } from '@/app/shared/constants';

describe('TaxCalculator', () => {
  describe('calculateTax', () => {
    it('should return 0 if totalValue is less than or equal to TAX_EXEMPTION', () => {
      expect(TaxCalculator.calculateTax(1000, TAX_EXEMPTION)).toBe(0.0);
      expect(TaxCalculator.calculateTax(1000, TAX_EXEMPTION - 1)).toBe(0.0);
    });

    it('should return 0 if profit is 0 or negative, regardless of totalValue', () => {
      expect(TaxCalculator.calculateTax(0, TAX_EXEMPTION + 1)).toBe(0.0);
      expect(TaxCalculator.calculateTax(-500, TAX_EXEMPTION + 1)).toBe(0.0);
    });

    it('should correctly calculate tax if totalValue exceeds TAX_EXEMPTION', () => {
      const profit = 1000;
      const totalValue = TAX_EXEMPTION + 1;
      const expectedTax = profit * TAX_RATE;

      expect(TaxCalculator.calculateTax(profit, totalValue)).toBeCloseTo(
        expectedTax,
        2
      );
    });

    it('should calculate tax with high profit and totalValue', () => {
      const profit = 50000;
      const totalValue = 100000;
      const expectedTax = profit * TAX_RATE;

      expect(TaxCalculator.calculateTax(profit, totalValue)).toBeCloseTo(
        expectedTax,
        2
      );
    });
  });
});
