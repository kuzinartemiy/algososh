import React, {
  ChangeEvent, FormEvent, useState, FC, useRef,
} from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
// import { ElementStates } from '../../types/element-states';
// import { sleep } from '../../utils/sleep';
import { getElementsState, getRevertStringSteps } from '../../utils/string';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';

// interface ICircle {
//   value: string;
//   state: ElementStates;
// }

export const StringComponent: FC = () => {
  const [string, setString] = useState<string>('');
  // const [arr, setArr] = useState<ICircle[]>([]);
  // const [inProgress, setInProgress] = useState<boolean>(false);
  const maxStringLength = 11;
  // eslint-disable-next-line no-undef
  const intervalObj = useRef<NodeJS.Timeout>();

  const [reversingAlgoSteps, setReversingAlgoSteps] = useState<string[][]>([]);
  const [currentReversingAlgoStep, setCurrentReversingAlgoStep] = useState(0);

  const changeString = (evt: ChangeEvent<HTMLInputElement>) => {
    setString(evt.target.value);
  };

  // const revert = async (array: ICircle[]) => {
  //   if (!array.length) return [];
  //   const mid = array.length / 2;
  //   let i = 0;
  //   while (i < mid) {
  //     array[i].state = ElementStates.Changing;
  //     array[array.length - 1 - i].state = ElementStates.Changing;
  //     setArr([...array]);
  //     await sleep(DELAY_IN_MS);

  //     array[i].state = ElementStates.Modified;
  //     array[array.length - 1 - i].state = ElementStates.Modified;

  //     const tmp = array[i];
  //     array[i] = array[array.length - 1 - i];
  //     array[array.length - 1 - i] = tmp;

  //     setArr([...array]);
  //     await sleep(DELAY_IN_MS);
  //     i += 1;
  //   }
  // };

  const reverseString = () => {
    const steps = getRevertStringSteps(string);
    setReversingAlgoSteps(steps);
    setCurrentReversingAlgoStep(0);

    if (steps.length > 1) {
      intervalObj.current = setInterval(() => {
        setCurrentReversingAlgoStep((currentStep) => {
          const nextStep = currentStep + 1;

          if (nextStep >= steps.length - 1 && intervalObj.current) {
            clearInterval(intervalObj.current);
          }
          return nextStep;
        });
      }, DELAY_IN_MS);
    }
  };

  const submitHandler = async (evt: FormEvent) => {
    evt.preventDefault();
    reverseString();
    // setInProgress(true);
    // const stringArray = string.split('');
    // const stateCircles: ICircle[] = [];

    // stringArray.forEach((value) => stateCircles.push({
    //   value,
    //   state: ElementStates.Default,
    // }));
    // setArr([...stateCircles]);
    // await revert(stateCircles);
    // setInProgress(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.string}>
        <form onSubmit={submitHandler} className={styles.string__form}>
          <Input onChange={changeString} value={string} isLimitText maxLength={maxStringLength} extraClass={styles.string__input} />
          <Button
            // isLoader={inProgress}
            isLoader={currentReversingAlgoStep < reversingAlgoSteps.length - 1}
            type="submit"
            text="Развернуть"
            disabled={!string.length}
          />
        </form>
        <ul className={styles.string__letters}>
          {/* {arr && arr.map((item, index) => (
            <li key={index}>
              <Circle
                // state={item.state}
                state={getElementsState(
                  index,
                  reversingAlgoSteps[currentReversingAlgoStep].length - 1,
                  currentReversingAlgoStep,
                  currentReversingAlgoStep === reversingAlgoSteps.length - 1,
                )}
                letter={item.value}
              />
            </li>
          ))} */}
          {reversingAlgoSteps.length > 0
          && reversingAlgoSteps[currentReversingAlgoStep].map((char, index) => (
            <li key={index}>
              <Circle
                letter={char}
                state={getElementsState(
                  index,
                  reversingAlgoSteps[currentReversingAlgoStep].length - 1,
                  currentReversingAlgoStep,
                  currentReversingAlgoStep === reversingAlgoSteps.length - 1,
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
