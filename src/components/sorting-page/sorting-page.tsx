import { FC, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';

interface IColumn {
  el: number;
  state: ElementStates;
}

export const SortingPage: FC = () => {
  const [sortMethod, setSortMethod] = useState<'selectionSort' | 'bubbleSort'>('selectionSort');
  const [sortArray, setSortArray] = useState<IColumn[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const getRandomArr = (minLen: number, maxLen: number) => {
    const randomLen = Math.floor(Math.random() * (maxLen - minLen)) + minLen;
    const randomNumsArray = Array.from({
      length: randomLen
    }, () => Math.floor(Math.random() * 100));
    const columnsArray = randomNumsArray.map((el) => ({
      el,
      state: ElementStates.Default,
    }));

    return columnsArray;
  }

  const setNewArray = () => {
    setSortArray(getRandomArr(3, 17));
  }

  const bubbleSort = async (array: IColumn[], direction: 'asc' | 'desc') => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {

        array[j].state = ElementStates.Changing;
        if (array[j + 1]) array[j + 1].state = ElementStates.Changing;

        setSortArray([...array]);
        await sleep(SHORT_DELAY_IN_MS);
        if ((direction === 'asc' && (array[j].el > array[j + 1]?.el)) || ((direction === 'desc') && (array[j].el < array[j + 1]?.el))) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }

        array[j].state = ElementStates.Default;
        if (array[j + 1]) array[j + 1].state = ElementStates.Default;
        setSortArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setSortArray([...array]);
    }
  }

  const selectionSort = async (array: IColumn[], direction: 'asc' | 'desc') => {   
    for(let i = 0; i < array.length; i++) {
      let min = i;
      array[min].state = ElementStates.Changing;
      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        setSortArray([...array]);
        await sleep(SHORT_DELAY_IN_MS);
        if ((direction === 'asc' && array[j].el < array[min].el) || (direction === 'desc' && array[j].el > array[min].el)) {
          min = j;
          array[j].state = ElementStates.Changing;
          array[min].state = i === min ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== min) array[j].state = ElementStates.Default;
        
        setSortArray([...array]);
      }

      let tmp = array[i]; 
      array[i] = array[min];
      array[min] = tmp;

      array[min].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setSortArray([...array]);
    }
  }

  const ascSort = async () => {
    setInProgress(true);
    if (sortMethod === 'bubbleSort') {
      await bubbleSort(sortArray, 'asc');
    }
    if (sortMethod === 'selectionSort') {
      await selectionSort(sortArray, 'asc');
    }
    setInProgress(false);
  }

  const descSort = async () => {
    setInProgress(true);
    if (sortMethod === 'bubbleSort') {
      await bubbleSort(sortArray, 'desc');
    }
    if (sortMethod === 'selectionSort') {
      await selectionSort(sortArray, 'desc');
    }
    setInProgress(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sortingPage}>
        <form className={styles.sortingPage__form}>
          <RadioInput
            onChange={() => setSortMethod('selectionSort')}
            checked={sortMethod === 'selectionSort'} 
            name="sortMethod" 
            label="Выбор"
            disabled={inProgress}
          />
          <RadioInput 
            onChange={() => setSortMethod('bubbleSort')}  
            checked={sortMethod === 'bubbleSort'} 
            name="sortMethod" 
            label="Пузырёк"
            disabled={inProgress}
          />
          <Button isLoader={inProgress} onClick={ascSort} type="button" text="По возрастанию" sorting={Direction.Ascending} />
          <Button isLoader={inProgress} onClick={descSort} type="button" text="По убыванию" sorting={Direction.Descending} />
          <Button isLoader={inProgress} onClick={setNewArray} text="Новый массив"/>
        </form>
        <ul className={styles.sortingPage__columns}>
          {sortArray && sortArray.map((element: IColumn, index: number) => (
            <li key={index}>
              <Column index={element.el} state={element.state}/>
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
