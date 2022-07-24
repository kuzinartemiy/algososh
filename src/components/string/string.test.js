/* eslint-disable no-undef */
import { getRevertStringSteps } from '../../utils/string';

const resultForEvenSymbols = [
  ['1', '2', '3', '4'],
  ['4', '2', '3', '1'],
  ['4', '3', '2', '1'],
];

const resultForOddSymbols = [
  ['1', '2', '3', '4', '5'],
  ['5', '2', '3', '4', '1'],
  ['5', '4', '3', '2', '1'],
];

const resultForOneSymbol = [
  ['1'],
];

const resultForEmptyString = [
  [],
];

describe('testing of getRevertStringSteps util', () => {
  it('should return correct steps for argument 1234', () => {
    expect(getRevertStringSteps('1234')).toEqual(resultForEvenSymbols);
  });

  it('should return correct steps for argument 12345', () => {
    expect(getRevertStringSteps('12345')).toEqual(resultForOddSymbols);
  });

  it('should return correct steps for one argument', () => {
    expect(getRevertStringSteps('1')).toEqual(resultForOneSymbol);
  });

  it('should return correct steps for empty string', () => {
    expect(getRevertStringSteps('')).toEqual(resultForEmptyString);
  });
});
