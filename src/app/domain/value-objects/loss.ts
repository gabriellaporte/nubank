export class Loss {
  private value: number = 0;

  accumulate(loss: number): void {
    this.value += loss;
  }

  deduct(profit: number): number {
    const taxableProfit = Math.max(0, profit - this.value);
    this.value = Math.max(0, this.value - profit);
    return taxableProfit;
  }

  getValue(): number {
    return this.value;
  }
}
