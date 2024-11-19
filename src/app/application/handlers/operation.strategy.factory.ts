import { Operation } from '../../domain/value-objects';
import {
  BuyOperationStrategy,
  OperationStrategy,
  SellOperationStrategy,
} from './';
import { BUY_TYPE, SELL_TYPE } from '../../shared/constants';

export class OperationStrategyFactory {
  static create(operation: Operation): OperationStrategy {
    switch (operation.type) {
      case BUY_TYPE:
        return new BuyOperationStrategy();
      case SELL_TYPE:
        return new SellOperationStrategy();
      default:
        throw new Error(
          `No handler found for operation type: ${operation.type}`
        );
    }
  }
}
