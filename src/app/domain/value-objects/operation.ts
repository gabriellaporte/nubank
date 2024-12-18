import { BUY_TYPE, SELL_TYPE } from '../../shared/constants';

export class Operation {
  constructor(
    public readonly type: string,
    public readonly unitCost: number,
    public readonly quantity: number
  ) {
    this.validate();
  }

  private validate(): void {
    if (![BUY_TYPE, SELL_TYPE].includes(this.type)) {
      throw new Error(`Operation type must be "${BUY_TYPE}" or "${SELL_TYPE}"`);
    }

    if (this.unitCost <= 0) {
      throw new Error('Unit cost must be greater than zero');
    }

    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
  }

  static fromJSON(json: any): Operation {
    return new Operation(json.operation, json['unit-cost'], json.quantity);
  }

  public calculateNetProceeds(averagePrice: number): number {
    return (this.unitCost - averagePrice) * this.quantity;
  }

  get totalValue(): number {
    return this.unitCost * this.quantity;
  }
}
