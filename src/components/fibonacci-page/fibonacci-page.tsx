/* eslint-disable no-bitwise */
import { nanoid } from 'nanoid';
import React, {
  ChangeEvent, FormEvent, useState, FC,
} from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { sleep } from '../../utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './fibonacci-page.module.css';

export const FibonacciPage: FC = () => {
  const maxLength = 11;
  const [number, setNumber] = useState<number>(0);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [fibonacci, setFibonacci] = useState<number[]>([]);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setNumber(~~evt.target.value);
  };

  const getFibonacci = async (num: number) => {
    let a = 1; let b = 0; let
      temp;
    const tempSequence = [];

    while (num >= 0) {
      temp = a;
      a += b;
      b = temp;
      tempSequence.push(b);

      await sleep(SHORT_DELAY_IN_MS);
      setFibonacci([...tempSequence]);

      num -= 1;
    }
  };

  const submitHandler = async (evt: FormEvent) => {
    evt.preventDefault();

    setInProgress(true);
    setFibonacci([]);
    await getFibonacci(number);
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.fibonacciPage}>
        <form onSubmit={submitHandler} className={styles.fibonacciPage__form}>
          <Input onChange={changeHandler} value={number} type="number" isLimitText max={maxLength} extraClass={styles.string__input} />
          <Button isLoader={inProgress} type="submit" text="Рассчитать" />
        </form>
        <ul className={styles.fibonacciPage__numbers}>
          {fibonacci && fibonacci.map((item: number, index: number) => (
            <li key={nanoid(10)}>
              <Circle letter={item.toString()} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
