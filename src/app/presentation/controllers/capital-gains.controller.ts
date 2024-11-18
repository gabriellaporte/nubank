export class CapitalGainsController {
  async calculate(data: DataType[][]): Promise<void> {
    console.log(data);
  }
}

export type DataType = {
  operation: 'buy' | 'sell';
  'unit-cost': number;
  quantity: number;
};
