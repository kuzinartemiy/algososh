import { ElementStates } from '../types/element-states';

export const getRevertStringSteps = (str: string): string[][] => {
  const srcLetters = str.split('');
  const steps = [[...srcLetters]];

  if (str.length <= 1) return steps;

  const mid = Math.ceil((str.length - 1) / 2);

  for (let i = 0; i < mid; i += 1) {
    const right = str.length - 1 - i;

    srcLetters[right] = str[i];
    srcLetters[i] = str[right];
    steps.push([...srcLetters]);
  }
  return steps;
};

export function getElementsState(
  index: number,
  maxIndex: number,
  currentStep: number,
  isFinished: boolean,
): ElementStates {
  if (index < currentStep || index > maxIndex - currentStep || isFinished) {
    return ElementStates.Modified;
  }

  if (index === currentStep || index === maxIndex - currentStep) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
}
