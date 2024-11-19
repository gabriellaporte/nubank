import { Operation, Portfolio } from '../../domain/value-objects/';
import { OperationStrategy } from './';
import { TaxCalculator } from '../../domain/domain-services/tax-calculator';
import { Tax } from '../../domain/handlers/operation.strategy.interface';

export class SellOperationStrategy implements OperationStrategy {
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

  private calculateTax(
    portfolio: Portfolio,
    netProceeds: number,
    operation: Operation
  ): Tax {
    const taxableProfit = portfolio.calculateTaxableProfit(netProceeds);
    portfolio.deductLosses(netProceeds);
    const totalValue = operation.unitCost * operation.quantity;
    const tax = TaxCalculator.calculateTax(taxableProfit, totalValue);

    return { tax: parseFloat(tax.toFixed(2)) };
  }
}
