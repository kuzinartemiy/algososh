import { nanoid } from 'nanoid';
import React, { useState, FC, ChangeEvent } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { sleep } from '../../utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';

interface IStack<T> {
  // eslint-disable-next-line no-unused-vars
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
}

interface ICircle {
  value: string | null,
  state: ElementStates;
}

export const StackPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [stackContainer, setStackContainer] = useState<ICircle[]>([]);

  const onChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
      this.container.push(item);
    };

    pop = (): void => {
      this.container.pop();
    };

    peak = (): T | null => {
      if (this.container.length) return this.container[this.container.length - 1];
      return null;
    };

    getSize = () => this.container.length;

    clear = (): void => {
      this.container = [];
    };
  }

  const stack = new Stack<string>();

  const onAddStack = async () => {
    if (inputValue) {
      stack.push(inputValue);
      stackContainer.push({
        value: stack.peak(),
        state: ElementStates.Changing,
      });
      setInputValue('');
      setStackContainer([...stackContainer]);
      await sleep(SHORT_DELAY_IN_MS);

      stackContainer[stackContainer.length - 1].state = ElementStates.Default;
      setStackContainer([...stackContainer]);
    }
  };

  const onRemoveStack = async () => {
    stackContainer[stackContainer.length - 1].state = ElementStates.Changing;
    setStackContainer([...stackContainer]);
    await sleep(SHORT_DELAY_IN_MS);
    stack.pop();
    stackContainer.pop();
    setStackContainer([...stackContainer]);
  };

  const onClearStack = () => {
    stack.clear();
    setStackContainer([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stackPage}>
        <form className={styles.stackPage__form}>
          <Input isLimitText maxLength={4} onChange={onChangeInputValue} value={inputValue} placeholder="Введите текст" />
          <Button onClick={onAddStack} type="button" text="Добавить" />
          <Button disabled={!stackContainer.length} onClick={onRemoveStack} type="button" text="Удалить" />
          <Button disabled={!stackContainer.length} onClick={onClearStack} type="button" text="Очистить" />
        </form>
        <ul className={styles.stackPage__stack}>
          {stackContainer.map((item: ICircle, index: number) => (
            <li key={nanoid(10)}>
              <Circle
                state={item.state}
                letter={item.value || ''}
                index={index}
                head={stackContainer.length - 1 === index ? 'top' : ''}
              />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
