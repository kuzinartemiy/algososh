/* eslint-disable no-unused-vars */
import React, {
  ChangeEvent, FC, useEffect, useMemo, useState,
} from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { sleep } from '../../utils/sleep';
import { Queue } from '../../utils/queue';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';

interface ICircle {
  value: string;
  head: boolean;
  tail: boolean;
  state: ElementStates;
}

export const QueuePage: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [queueContainer, setQueueContainer] = useState<ICircle[]>([]);
  const [isQueueEmpty, setIsQueueEmpty] = useState<boolean>(true);

  const maxQueueLength = 7;

  const queue = useMemo(() => new Queue<string>(maxQueueLength), []);

  const initialItem = {
    value: '',
    head: false,
    tail: false,
    state: ElementStates.Default,
  };

  const getInitialQueueState = () => {
    let i = 0;
    const array = [];

    while (i < maxQueueLength) {
      array.push(initialItem);
      i += 1;
    }
    return array;
  };

  useEffect(() => {
    const initialArray = getInitialQueueState();
    setQueueContainer([...initialArray]);
  }, []);

  useEffect(() => {
    setIsQueueEmpty(queue.isEmpty);
  }, [queueContainer]);

  const onChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onEnqueue = async () => {
    const tailIndex = !queue.isEmpty() ? queue.getTail().index : 0;

    if (inputValue && (tailIndex + 1 !== maxQueueLength)) {
      queue.enqueue(inputValue);

      const head = queue.getHead();
      const tail = queue.getTail();

      queueContainer[head.index] = {
        ...initialItem,
        head: true,
        value: head.value || '',
      };

      if (tail.index) queueContainer[tail.index - 1].tail = false;

      queueContainer[tail.index] = {
        ...queueContainer[tail.index],
        tail: true,
        value: tail.value || '',
        state: ElementStates.Changing,
      };
      setInputValue('');
      setQueueContainer([...queueContainer]);
      await sleep(SHORT_DELAY_IN_MS);
      queueContainer[tail.index] = {
        ...queueContainer[tail.index],
        state: ElementStates.Default,
      };
      setQueueContainer([...queueContainer]);
    }
  };

  const onClearQueue = () => {
    queue.clear();
    const initialArray = getInitialQueueState();
    setQueueContainer([...initialArray]);
  };

  const onDequeue = async () => {
    const tail = queue.getTail();
    const head = queue.getHead();

    if (head.index !== tail.index) {
      queue.dequeue();
      const actualHead = queue.getHead();

      queueContainer[actualHead.index - 1] = {
        ...queueContainer[actualHead.index - 1],
        state: ElementStates.Changing,
      };
      setQueueContainer([...queueContainer]);
      await sleep(SHORT_DELAY_IN_MS);

      queueContainer[actualHead.index - 1] = {
        ...queueContainer[actualHead.index - 1],
        state: ElementStates.Default,
      };

      if (actualHead.index) {
        queueContainer[actualHead.index - 1] = initialItem;
      }

      queueContainer[actualHead.index].value = actualHead.value || '';
      queueContainer[actualHead.index].head = true;

      setQueueContainer([...queueContainer]);
    } else {
      onClearQueue();
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queuePage}>
        <form className={styles.queuePage__form}>
          <Input isLimitText maxLength={4} onChange={onChangeInputValue} value={inputValue} placeholder="Введите текст" />
          <Button disabled={!inputValue} onClick={onEnqueue} type="button" text="Добавить" />
          <Button disabled={isQueueEmpty} onClick={onDequeue} type="button" text="Удалить" />
          <Button disabled={isQueueEmpty} onClick={onClearQueue} type="button" text="Очистить" />
        </form>
        <ul className={styles.queuePage__queue}>
          {queueContainer.map((item, index) => (
            <li key={index}>
              <Circle
                state={item ? item.state : ElementStates.Default}
                letter={item ? item.value : ''}
                index={index}
                tail={item.tail ? 'tail' : ''}
                head={item.head ? 'head' : ''}
              />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
