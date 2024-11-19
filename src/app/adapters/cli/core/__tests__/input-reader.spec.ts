import * as readline from 'node:readline';
import { InputReader } from '../input-reader';

jest.mock('node:readline');

describe('InputReader', () => {
  let inputReader: InputReader;
  let mockOn: jest.Mock;
  let mockClose: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockOn = jest.fn();
    mockClose = jest.fn();

    jest.spyOn(readline, 'createInterface').mockReturnValue({
      on: mockOn,
      close: mockClose,
    } as unknown as readline.Interface);

    inputReader = new InputReader();
  });

  it('should read input and resolve with the concatenated string', async () => {
    mockOn.mockImplementation((event, callback) => {
      if (event === 'line') {
        callback('line 1');
        callback('line 2');
        callback('');
      }
      if (event === 'close') {
        callback();
      }
      return mockOn;
    });

    const result = await inputReader.read();

    expect(result).toBe('line 1\nline 2');
    expect(readline.createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout,
    });
    expect(mockClose).toHaveBeenCalled();
  });

  it('should resolve with an empty string if no input is provided', async () => {
    mockOn.mockImplementation((event, callback) => {
      if (event === 'line') {
        callback('');
      }
      if (event === 'close') {
        callback();
      }
      return mockOn;
    });

    const result = await inputReader.read();

    expect(result).toBe('');
    expect(readline.createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout,
    });
    expect(mockClose).toHaveBeenCalled();
  });

  it('should reject if an error occurs during input', async () => {
    const mockError = new Error('Readline error');

    mockOn.mockImplementation((event, callback) => {
      if (event === 'error') {
        callback(mockError);
      }
      return mockOn;
    });

    await expect(inputReader.read()).rejects.toThrow('Readline error');
    expect(readline.createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout,
    });
  });
});
