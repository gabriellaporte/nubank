import { BUY_TYPE, SELL_TYPE } from '../../shared/constants';

export class Operation {
  constructor(
    public readonly type: string,
    public readonly unitCost: number,
    public readonly quantity: number
  ) {
    this.validate();
  }

  static fromJSON(json: any): Operation {
    return new Operation(json.operation, json['unit-cost'], json.quantity);
  }

  private validate(): void {
    if (![BUY_TYPE, SELL_TYPE].includes(this.type)) {
      throw new Error('Operation type must be "buy" or "sell"');
    }

    if (this.unitCost <= 0) {
      throw new Error('Unit cost must be greater than zero');
    }

    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
  }

  public calculateNetProceeds(averagePrice: number): number {
    return (this.unitCost - averagePrice) * this.quantity;
  }
}
