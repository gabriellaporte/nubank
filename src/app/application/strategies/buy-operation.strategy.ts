import { Operation, Portfolio } from '../../domain/value-objects';
import { OperationStrategy } from './';

export class BuyOperationStrategy implements OperationStrategy {
  /**
   * Does nothing but update the average price of the portfolio
   *
   * @param operation     The operation to be handled
   * @param portfolio     The portfolio to be updated
   * @returns             The tax to be paid, which is always 0 for a buy operation
   */
  handle(operation: Operation, portfolio: Portfolio): { tax: number } {
    portfolio.updateAveragePrice(operation.unitCost, operation.quantity);
    return { tax: 0.0 };
  }
}
