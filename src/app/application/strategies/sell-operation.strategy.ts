import { Operation, Portfolio } from '../../domain/value-objects/';
import { OperationStrategy } from './';
import { TaxCalculator } from '../../domain/domain-services/tax-calculator';
import { Tax } from '@/app/domain/strategies/operation.strategy.interface';

export class SellOperationStrategy implements OperationStrategy {
  /**
   * Registers a sell operation in the portfolio and calculates the tax to be paid
   * based on the operating profit. If the operation results in a loss, the loss
   * is accumulated in the portfolio which stores the total losses for all operations
   * being currently handled in the input.
   *
   *
   * @param operation     The operation to be handled
   * @param portfolio     The portfolio to be updated
   * @returns             The tax to be paid. If the operation results in a loss, the tax is 0.
   */
  handle(operation: Operation, portfolio: Portfolio): Tax {
    const netProceeds = this.processNetProceeds(operation, portfolio);

    if (netProceeds <= 0) {
      portfolio.accumulateLoss(Math.abs(netProceeds));
      return { tax: 0.0 };
    }

    return this.calculateTax(portfolio, netProceeds, operation);
  }

  private processNetProceeds(
    operation: Operation,
    portfolio: Portfolio
  ): number {
    const netProceeds = operation.calculateNetProceeds(
      portfolio.getAveragePrice()
    );

    portfolio.updateTotalQuantity(-operation.quantity);
    return netProceeds;
  }

  /**
   * Calculates the tax to be paid based on the taxable profit, which is the
   * accumulated profit (including the current one) minus the accumulated losses.
   *
   * @param portfolio
   * @param netProceeds
   * @param operation
   * @private
   */
  private calculateTax(
    portfolio: Portfolio,
    netProceeds: number,
    operation: Operation
  ): Tax {
    const taxableProfit = portfolio.calculateTaxableProfit(netProceeds);
    portfolio.deductLosses(netProceeds);
    const tax = TaxCalculator.calculateTax(taxableProfit, operation.totalValue);

    return { tax: parseFloat(tax.toFixed(2)) };
  }
}
