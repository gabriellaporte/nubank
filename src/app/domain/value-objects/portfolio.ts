import { AveragePrice, Loss } from './';

export class Portfolio {
  private readonly averagePrice: AveragePrice = new AveragePrice();
  private readonly loss: Loss = new Loss();
  private totalQuantity: number = 0;

  updateAveragePrice(unitCost: number, quantity: number): void {
    this.updateTotalQuantity(quantity);
    this.averagePrice.update(unitCost, quantity, this.totalQuantity);
  }

  updateTotalQuantity(quantity: number): void {
    this.totalQuantity += quantity;

    if (this.totalQuantity < 0) {
      throw new Error("You can't have negative stocks");
    }
  }

  calculateTaxableProfit(profit: number): number {
    if (profit <= 0) {
      return 0;
    }

    const deductible = this.loss.calculateDeductibleAmount(profit);
    return profit - deductible;
  }

  deductLosses(profit: number): void {
    this.loss.reduce(profit);
  }

  accumulateLoss(loss: number): void {
    this.loss.accumulate(loss);
  }

  getAveragePrice(): number {
    return this.averagePrice.getValue();
  }

  getLosses(): number {
    return this.loss.getValue();
  }

  getTotalQuantity(): number {
    return this.totalQuantity;
  }
}
