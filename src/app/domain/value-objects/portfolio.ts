import { AveragePrice, Loss } from './';

export class Portfolio {
  private readonly averagePrice: AveragePrice = new AveragePrice();
  private readonly loss: Loss = new Loss();
  private totalQuantity: number = 0;

  updateAveragePrice(unitCost: number, quantity: number): void {
    this.totalQuantity += quantity;
    this.averagePrice.update(unitCost, quantity, this.totalQuantity);
  }

  calculateProfitOrLoss(unitCost: number, quantity: number): number {
    return this.averagePrice.calculateProfitOrLoss(unitCost, quantity);
  }

  deductLosses(profit: number): number {
    return this.loss.deduct(profit);
  }

  accumulateLoss(loss: number): void {
    this.loss.accumulate(loss);
  }

  getAveragePrice(): number {
    return this.averagePrice.getValue();
  }

  getTotalQuantity(): number {
    return this.totalQuantity;
  }

  getLosses(): number {
    return this.loss.getValue();
  }
}
