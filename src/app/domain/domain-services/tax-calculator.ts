import { TAX_EXEMPTION, TAX_RATE } from '../../shared/constants';

export class TaxCalculator {
  static calculateTax(profit: number, totalValue: number): number {
    if (totalValue <= TAX_EXEMPTION) {
      return 0.0;
    }

    return profit * TAX_RATE;
  }
}
