import { Loss } from '../loss';

describe('Loss', () => {
  let loss: Loss;

  beforeEach(() => {
    loss = new Loss();
  });

  describe('accumulate', () => {
    it('should accumulate losses correctly', () => {
      loss.accumulate(500);
      expect(loss.getValue()).toBe(500);

      loss.accumulate(300);
      expect(loss.getValue()).toBe(800);
    });

    it('should handle accumulation with zero loss', () => {
      loss.accumulate(0);
      expect(loss.getValue()).toBe(0);

      loss.accumulate(100);
      expect(loss.getValue()).toBe(100);
    });
  });

  describe('reduce', () => {
    it('should reduce the accumulated losses correctly', () => {
      loss.accumulate(1000);
      loss.reduce(500);
      expect(loss.getValue()).toBe(500);
    });

    it('should reduce the losses completely if amount equals the loss', () => {
      loss.accumulate(1000);
      loss.reduce(1000);
      expect(loss.getValue()).toBe(0);
    });

    it('should not reduce losses below zero', () => {
      loss.accumulate(500);
      loss.reduce(1000);
      expect(loss.getValue()).toBe(0);
    });
  });

  describe('calculateDeductibleAmount', () => {
    it('should return the full loss amount if it is less than or equal to the requested amount', () => {
      loss.accumulate(500);
      const deductible = loss.calculateDeductibleAmount(1000);
      expect(deductible).toBe(500);
    });

    it('should return the requested amount if it is less than the available loss', () => {
      loss.accumulate(1000);
      const deductible = loss.calculateDeductibleAmount(500);
      expect(deductible).toBe(500);
    });

    it('should return 0 if there is no accumulated loss', () => {
      const deductible = loss.calculateDeductibleAmount(500);
      expect(deductible).toBe(0);
    });
  });

  describe('getValue', () => {
    it('should return the current loss value', () => {
      expect(loss.getValue()).toBe(0);

      loss.accumulate(500);
      expect(loss.getValue()).toBe(500);

      loss.reduce(300);
      expect(loss.getValue()).toBe(200);
    });
  });
});
