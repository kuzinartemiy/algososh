/* eslint-disable no-unused-vars */
/* eslint-disable no-bitwise */
import { nanoid } from 'nanoid';
import React, {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { sleep } from '../../utils';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';

interface ILittleCircle {
  value: string;
  state: ElementStates;
  position: 'top' | 'bottom';
}

interface ICircle {
  value: string;
  state: ElementStates;
  littleCircle: ILittleCircle | null;
}

export const ListPage: React.FC = () => {
  const [listContainer, setListContainer] = useState<ICircle[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number | null>(null);
  const [isListEmpty, setIsListEmpty] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);

  class Node<T> {
    value: T;

    // eslint-disable-next-line no-use-before-define
    next: Node<T> | null;

    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }

  interface ILinkedList<T> {
    append: (element: T) => void;
    insertAt: (element: T, position: number) => void;
    getSize: () => number;
    print: () => void;
    findElement: (index: number) => void;
    removeAt: (index: number) => void;
  }

  class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;

    private size: number;

    constructor() {
      this.head = null;
      this.size = 0;
    }

    findElement(index: number) {
      if (index < 0 || index > this.size) {
        console.log('Enter a valid index');
        return;
      }
      let currentNode = this.head;
      let count = 0;

      while (currentNode) {
        if (count === index) {
          return currentNode.value;
        }

        count += 1;
        currentNode = currentNode.next;
      }

      return null;
    }

    removeAt(index: number) {
      if (index < 0 || index > this.size) {
        throw new Error('Enter a valid index');
      }

      let curr = this.head;

      if (curr && index === 0) {
        this.head = curr.next;
      } else {
        for (let i = 0; curr != null && i < index - 1; i += 1) {
          curr = curr.next;
        }

        if (curr == null || curr.next == null) {
          return null;
        }

        const { next } = curr.next;

        curr.next = next;
      }

      this.size -= 1;
    }

    insertAt(element: T, index: number) {
      if (index < 0 || index > this.size) {
        throw new Error('Enter a valid index');
      } else {
        const node = new Node(element);

        if (index === 0) {
          node.next = this.head;
          this.head = node;
        } else if (this.head) {
          let curr = this.head;
          let currIndex = 0;

          while (currIndex + 1 < index && curr.next) {
            curr = curr.next;
            currIndex += 1;
          }

          const trav = curr.next;
          curr.next = node;
          node.next = trav;
        }

        this.size += 1;
      }
    }

    append(element: T) {
      const node = new Node(element);
      let current;

      if (this.head === null) {
        this.head = node;
      } else {
        current = this.head;
        while (current.next) {
          current = current.next;
        }

        current.next = node;
      }
      this.size += 1;
    }

    getSize() {
      return this.size;
    }

    print() {
      let curr = this.head;
      let res = '';
      while (curr) {
        res += `${curr.value} `;
        curr = curr.next;
      }
      console.log(res);
    }
  }

  const list = useMemo(() => new LinkedList<string>(), []);

  const initialValues = ['0', '34', '8', '1'];

  useEffect(() => {
    initialValues.forEach((item) => list.insertAt(item, 0));
    const arr = initialValues.map((item) => ({
      value: item,
      state: ElementStates.Default,
      littleCircle: null,
    }));

    setListContainer([...arr]);
  }, []);

  useEffect(() => {
    setIsListEmpty(list.getSize() === 0);
  }, [listContainer]);

  const onChangeValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onChangeIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(~~evt.target.value);
  };

  const onAddToHead = async () => {
    setInProgress(true);
    list.insertAt(inputValue, 0);

    if (listContainer.length) {
      listContainer[0].littleCircle = {
        value: inputValue,
        position: 'top',
        state: ElementStates.Changing,
      };
    }

    setListContainer([...listContainer]);
    await sleep(SHORT_DELAY_IN_MS);

    if (listContainer[0]) listContainer[0].littleCircle = null;

    listContainer.unshift({
      ...listContainer[0],
      value: inputValue,
      state: ElementStates.Modified,
    });

    setListContainer([...listContainer]);
    await sleep(SHORT_DELAY_IN_MS);

    listContainer[0].state = ElementStates.Default;
    setInputValue('');
    setListContainer([...listContainer]);
    setInProgress(false);
  };

  const onAddToTail = async () => {
    setInProgress(true);
    list.append(inputValue);
    setInputValue('');

    const { length } = listContainer;

    listContainer[length - 1] = {
      ...listContainer[length - 1],
      littleCircle: {
        value: inputValue,
        position: 'bottom',
        state: ElementStates.Changing,
      },
    };

    setListContainer([...listContainer]);
    await sleep(SHORT_DELAY_IN_MS);

    listContainer[length - 1] = {
      ...listContainer[length - 1],
      littleCircle: null,
    };

    listContainer.push({
      value: inputValue,
      littleCircle: null,
      state: ElementStates.Modified,
    });

    setListContainer([...listContainer]);
    await sleep(SHORT_DELAY_IN_MS);

    listContainer[length].state = ElementStates.Default;

    setListContainer([...listContainer]);
    setInProgress(false);
  };

  const onRemoveFromHead = async () => {
    setInProgress(true);
    if (listContainer[0]) {
      const currValue = listContainer[0].value || '';

      listContainer[0] = {
        ...listContainer[0],
        value: '',
        littleCircle: {
          value: currValue,
          position: 'top',
          state: ElementStates.Changing,
        },
      };
      list.removeAt(0);

      setListContainer([...listContainer]);
      await sleep(SHORT_DELAY_IN_MS);

      listContainer.shift();
      setListContainer([...listContainer]);
    }
    setInProgress(false);
  };

  const onRemoveFromTail = async () => {
    setInProgress(true);
    const { length } = listContainer;

    if (listContainer[length - 1]) {
      const currValue = listContainer[length - 1].value || '';

      listContainer[length - 1] = {
        ...listContainer[length - 1],
        value: '',
        littleCircle: {
          value: currValue,
          position: 'bottom',
          state: ElementStates.Changing,
        },
      };
      list.removeAt(length - 1);

      setListContainer([...listContainer]);
      await sleep(SHORT_DELAY_IN_MS);

      listContainer.pop();
      setListContainer([...listContainer]);
    }
    setInProgress(false);
  };

  const addByIndex = async () => {
    if (inputValue && inputIndex && inputIndex < listContainer.length) {
      try {
        list.insertAt(inputValue, inputIndex);
      } catch (error) {
        console.log(error);
        return;
      }
      setInProgress(true);
      for (let i = 0; i <= inputIndex; i += 1) {
        listContainer[i] = {
          ...listContainer[i],
          state: ElementStates.Changing,
          littleCircle: {
            value: inputValue,
            position: 'top',
            state: ElementStates.Changing,
          },
        };
        await sleep(SHORT_DELAY_IN_MS);
        setListContainer([...listContainer]);
        if (i > 0) {
          listContainer[i - 1] = {
            ...listContainer[i - 1],
            littleCircle: null,
          };
        }

        setListContainer([...listContainer]);
      }
      await sleep(SHORT_DELAY_IN_MS);

      listContainer[inputIndex] = {
        ...listContainer[inputIndex],
        state: ElementStates.Default,
        littleCircle: null,
      };

      listContainer.splice(inputIndex, 0, {
        value: inputValue,
        state: ElementStates.Modified,
        littleCircle: null,
      });

      setListContainer([...listContainer]);

      listContainer[inputIndex].state = ElementStates.Default;
      listContainer.forEach((item: ICircle) => {
        item.state = ElementStates.Default;
      });
      await sleep(SHORT_DELAY_IN_MS);
      setListContainer([...listContainer]);
      setInputValue('');
      setInputIndex(null);
      setInProgress(false);
    }
  };

  const removeByIndex = async () => {
    if (inputIndex) {
      try {
        list.removeAt(inputIndex);
      } catch (error) {
        console.log(error);
        return;
      }
      setInProgress(true);
      for (let i = 0; i <= inputIndex; i += 1) {
        listContainer[i] = {
          ...listContainer[i],
          state: ElementStates.Changing,
        };
        await sleep(SHORT_DELAY_IN_MS);
        setListContainer([...listContainer]);
      }
      listContainer[inputIndex] = {
        ...listContainer[inputIndex],
        value: '',
        littleCircle: {
          value: listContainer[inputIndex].value,
          position: 'bottom',
          state: ElementStates.Changing,
        },
      };
      await sleep(SHORT_DELAY_IN_MS);
      setListContainer([...listContainer]);

      listContainer.splice(inputIndex, 1);

      listContainer[inputIndex - 1] = {
        ...listContainer[inputIndex - 1],
        state: ElementStates.Modified,
        value: listContainer[inputIndex - 1].value,
        littleCircle: null,
      };

      await sleep(SHORT_DELAY_IN_MS);
      setListContainer([...listContainer]);
      listContainer.forEach((item: ICircle) => {
        item.state = ElementStates.Default;
      });

      await sleep(SHORT_DELAY_IN_MS);
      setListContainer([...listContainer]);
    }
    setInProgress(false);
    setInputIndex(null);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.listPage}>
        <div className={styles.listPage__controls}>
          <Input
            onChange={onChangeValue}
            value={inputValue}
            isLimitText
            maxLength={4}
            placeholder="Введите значение"
          />
          <Button
            style={{ minWidth: 175 }}
            isLoader={inProgress}
            disabled={!inputValue}
            onClick={onAddToHead}
            type="button"
            text="Добавить в head"
          />
          <Button
            style={{ minWidth: 175 }}
            isLoader={inProgress}
            disabled={!inputValue}
            onClick={onAddToTail}
            type="button"
            text="Добавить в tail"
          />
          <Button
            style={{ minWidth: 175 }}
            isLoader={inProgress}
            disabled={isListEmpty}
            onClick={onRemoveFromHead}
            type="button"
            text="Удалить из head"
          />
          <Button
            style={{ minWidth: 175 }}
            isLoader={inProgress}
            disabled={isListEmpty}
            onClick={onRemoveFromTail}
            type="button"
            text="Удалить из tail"
          />
        </div>
        <div className={styles.listPage__controls}>
          <Input
            onChange={onChangeIndex}
            value={inputIndex || ''}
            placeholder="Введите индекс"
          />
          <Button
            style={{ minWidth: 362 }}
            isLoader={inProgress}
            type="button"
            onClick={addByIndex}
            text="Добавить по индексу"
          />
          <Button
            style={{ minWidth: 362 }}
            isLoader={inProgress}
            type="button"
            onClick={removeByIndex}
            text="Удалить по индексу"
          />
        </div>
        <ul className={styles.listPage__list}>
          {listContainer.map((item: ICircle, index: number) => (
            <li className={styles.listPage__listItem} key={nanoid(10)}>
              {item.littleCircle && (
                <Circle
                  extraClass={`${styles.listPage__littleCircle} ${styles[`listPage__littleCircle_${item.littleCircle.position}`]}`}
                  letter={item.littleCircle.value}
                  isSmall
                  state={item.littleCircle.state}
                />
              )}
              <Circle
                tail={(!item.littleCircle && index === listContainer.length - 1) ? 'tail' : ''}
                letter={item.value}
                index={index}
                head={!item.littleCircle && index === 0 ? 'head' : ''}
                state={item.state}
              />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
