import { Operation } from '../../domain/value-objects/operation';
import {
  BuyOperationHandler,
  OperationHandler,
  SellOperationHandler,
} from './';

export class OperationHandlerFactory {
  static create(operation: Operation): OperationHandler {
    switch (operation.type) {
      case 'buy':
        return new BuyOperationHandler();
      case 'sell':
        return new SellOperationHandler();
      default:
        throw new Error(
          `No handler found for operation type: ${operation.type}`
        );
    }
  }
}
