import { Operation, Portfolio } from '../../domain/value-objects';
import { OperationStrategy } from './';

export class BuyOperationStrategy implements OperationStrategy {
  handle(operation: Operation, portfolio: Portfolio): { tax: number } {
    portfolio.updateAveragePrice(operation.unitCost, operation.quantity);
    return { tax: 0.0 };
  }
}
