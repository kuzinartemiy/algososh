import { nanoid } from 'nanoid';
import React, {
  ChangeEvent, FormEvent, useState, FC,
} from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { sleep } from '../../utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';

interface IArrayData {
  el: string;
  state: ElementStates;
}

export const StringComponent: FC = () => {
  const [string, setString] = useState<string>('');
  const [arr, setArr] = useState<IArrayData[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const changeString = (evt: ChangeEvent<HTMLInputElement>) => {
    setString(evt.target.value);
  };

  const revert = async (array: IArrayData[]) => {
    if (!array.length) return [];
    const mid = array.length / 2;
    let i = 0;
    while (i < mid) {
      array[i].state = ElementStates.Changing;
      array[array.length - 1 - i].state = ElementStates.Changing;
      setArr([...array]);
      await sleep(DELAY_IN_MS);

      array[i].state = ElementStates.Modified;
      array[array.length - 1 - i].state = ElementStates.Modified;

      const tmp = array[i];
      array[i] = array[array.length - 1 - i];
      array[array.length - 1 - i] = tmp;

      setArr([...array]);
      await sleep(DELAY_IN_MS);
      i += 1;
    }
  };

  const submitHandler = async (evt: FormEvent) => {
    evt.preventDefault();
    setInProgress(true);
    const stringArray = string.split('');
    const stateCircles: IArrayData[] = [];

    stringArray.forEach((el) => stateCircles.push({
      el,
      state: ElementStates.Default,
    }));
    setArr([...stateCircles]);
    await revert(stateCircles);
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.string}>
        <form onSubmit={submitHandler} className={styles.string__form}>
          <Input onChange={changeString} value={string} isLimitText maxLength={11} extraClass={styles.string__input} />
          <Button isLoader={inProgress} type="submit" text="Развернуть" />
        </form>
        <ul className={styles.string__letters}>
          {arr && arr.map((item: IArrayData) => (
            <li key={nanoid(10)}>
              <Circle state={item.state} letter={item.el} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
