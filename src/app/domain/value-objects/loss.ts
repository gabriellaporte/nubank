export class Loss {
  private value: number = 0;

  accumulate(loss: number): void {
    this.value += loss;
  }

  reduce(amount: number): void {
    const deductibleAmount = this.calculateDeductibleAmount(amount);
    this.value -= deductibleAmount;
  }

  calculateDeductibleAmount(amount: number): number {
    return Math.min(this.value, amount);
  }

  getValue(): number {
    return this.value;
  }
}
