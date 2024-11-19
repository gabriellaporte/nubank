export class AveragePrice {
  private value: number = 0;

  /**
   * This updates the weighted average price of the portfolio, which is calculated
   * by the formula:
   * (oldAveragePrice * (totalQuantity - quantity) + unitCost * quantity) / totalQuantity
   * If the total quantity is 0, the average price is the unit cost.
   *
   * @param unitCost
   * @param quantity
   * @param totalQuantity
   */
  update(unitCost: number, quantity: number, totalQuantity: number): void {
    if (totalQuantity === 0) {
      this.value = unitCost;
      return;
    }

    const totalCost =
      this.value * (totalQuantity - quantity) + unitCost * quantity;
    this.value = parseFloat((totalCost / totalQuantity).toFixed(2));
  }

  getValue(): number {
    return this.value;
  }
}
