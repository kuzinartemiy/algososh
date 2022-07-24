/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */

import renderer from 'react-test-renderer';
import { Button } from './button';

const buttonText = 'Test text!';

describe('Checking Button component with snapshots.', () => {
  it('button should be rendered with text', () => {
    const button = renderer.create(<Button text={buttonText} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('button should be rendered without text', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('button should be disabled', () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('button should be with loader', () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });
});
