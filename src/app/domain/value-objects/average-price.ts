export class AveragePrice {
  private value: number = 0;

  update(unitCost: number, quantity: number, totalQuantity: number): void {
    if (totalQuantity === 0) {
      this.value = unitCost;
      return;
    }

    const totalCost =
      this.value * (totalQuantity - quantity) + unitCost * quantity;
    this.value = totalCost / totalQuantity;
  }

  calculateProfitOrLoss(unitCost: number, quantity: number): number {
    return (unitCost - this.value) * quantity;
  }

  getValue(): number {
    return this.value;
  }
}
