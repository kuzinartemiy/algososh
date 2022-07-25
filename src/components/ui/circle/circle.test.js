/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */

import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ArrowIcon } from '../icons/arrow-icon';
import { ElementStates } from '../../../types/element-states';

describe('Checking Circle component with snapshots.', () => {
  it('circle should be rendered without letter', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered with letter', () => {
    const circle = renderer.create(<Circle letter="X" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered with head', () => {
    const circle = renderer.create(<Circle head="X" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered with react-component in head', () => {
    const circle = renderer.create(<Circle head={<ArrowIcon />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered with tail', () => {
    const circle = renderer.create(<Circle tail="X" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered with react-component in tail', () => {
    const circle = renderer.create(<Circle tail={<ArrowIcon />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered with index', () => {
    const circle = renderer.create(<Circle index="1" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered with "isSmall" prop', () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered in default state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered in changing state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('circle should be rendered in modified state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
