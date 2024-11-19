import { Operation, Portfolio } from '../../domain/value-objects/';
import { OperationHandler } from './';
import { TaxCalculator } from '../../domain/domain-services/tax-calculator';
import { Tax } from '../../domain/handlers/operation.handler.interface';

export class SellOperationHandler implements OperationHandler {
  canHandle(operation: Operation): boolean {
    return operation.type === 'sell';
  }

  handle(operation: Operation, portfolio: Portfolio): Tax {
    const netProceeds = operation.calculateNetProceeds(
      portfolio.getAveragePrice()
    );
    portfolio.updateTotalQuantity(-operation.quantity);

    if (netProceeds <= 0) {
      portfolio.accumulateLoss(Math.abs(netProceeds));
      return { tax: 0.0 };
    }

    return this.calculateTax(portfolio, netProceeds, operation);
  }

  private calculateTax(
    portfolio: Portfolio,
    netProceeds: number,
    operation: Operation
  ) {
    const taxableProfit = portfolio.deductLosses(netProceeds);
    const totalValue = operation.unitCost * operation.quantity;
    const tax = TaxCalculator.calculateTax(taxableProfit, totalValue);

    return { tax: parseFloat(tax.toFixed(2)) };
  }
}
