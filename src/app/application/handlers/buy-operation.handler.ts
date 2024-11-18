import { Operation } from '../../domain/value-objects/operation';
import { Portfolio } from '../../domain/value-objects/portfolio';
import { OperationHandler } from './';

export class BuyOperationHandler implements OperationHandler {
  canHandle(operation: Operation): boolean {
    return operation.type === 'buy';
  }

  handle(operation: Operation, portfolio: Portfolio): { tax: number } {
    portfolio.updateAveragePrice(operation.unitCost, operation.quantity);
    return { tax: 0.0 };
  }
}
