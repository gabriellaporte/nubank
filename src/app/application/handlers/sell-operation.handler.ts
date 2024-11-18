import { Operation } from '../../domain/value-objects/operation';
import { Portfolio } from '../../domain/value-objects/portfolio';
import { OperationHandler } from './';
import { TaxCalculator } from '../../domain/domain-services/tax-calculator';

export class SellOperationHandler implements OperationHandler {
  canHandle(operation: Operation): boolean {
    return operation.type === 'sell';
  }

  handle(operation: Operation, portfolio: Portfolio): { tax: number } {
    const profitOrLoss = portfolio.calculateProfitOrLoss(
      operation.unitCost,
      operation.quantity
    );

    if (profitOrLoss <= 0) {
      portfolio.accumulateLoss(Math.abs(profitOrLoss));
      return { tax: 0.0 };
    }

    const taxableProfit = portfolio.deductLosses(profitOrLoss);
    const totalValue = operation.unitCost * operation.quantity;
    const tax = TaxCalculator.calculateTax(taxableProfit, totalValue);

    return { tax: parseFloat(tax.toFixed(2)) };
  }
}
