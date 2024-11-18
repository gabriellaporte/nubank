export class Portfolio {
  private averagePrice: number = 0;
  private totalQuantity: number = 0;
  private losses: number = 0;

  updateAveragePrice(unitCost: number, quantity: number): void {
    const totalCost =
      this.averagePrice * this.totalQuantity + unitCost * quantity;
    this.totalQuantity += quantity;
    this.averagePrice = totalCost / this.totalQuantity;
  }

  calculateProfitOrLoss(unitCost: number, quantity: number): number {
    return (unitCost - this.averagePrice) * quantity;
  }

  deductLosses(profit: number): number {
    const taxableProfit = Math.max(0, profit - this.losses);
    this.losses = Math.max(0, this.losses - profit);
    return taxableProfit;
  }

  accumulateLoss(loss: number): void {
    this.losses += loss;
  }

  getTotalQuantity(): number {
    return this.totalQuantity;
  }
}
