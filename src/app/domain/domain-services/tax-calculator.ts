export class TaxCalculator {
  static calculateTax(profit: number, totalValue: number): number {
    if (totalValue <= 20000) {
      return 0.0;
    }

    return profit * 0.2;
  }
}
