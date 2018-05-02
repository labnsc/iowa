import React from 'react';
import ReactDOM from 'react-dom';
import App, { parseOnSteroids } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('parseOnSteroids()', () => {
  it('uses all of 3 parsers for getting data ready for Brain Vision', () => {
    const WIN_CODE_FIRST_50 = 'S2222';
    const LOSS_CODE_FIRST_50 = 'S1111';
    const contents = [
      "Brain Vision",
      "Mk1=Stimulus,S111,14565,1,0",
      "Mk2=Stimulus,S111,14565,1,0",
      "Mk3=Stimulus,S111,14565,1,0",
      "Mk4=Stimulus,S134,57125,1,0",
      "Mk5=Stimulus,S123456,14565,1,0",
    ].join("\n");

    const actual = parseOnSteroids(contents);
    const expected = [
      "Brain Vision",
      `Mk1=Stimulus,${WIN_CODE_FIRST_50},14565,1,0`,
      `Mk2=Stimulus,${WIN_CODE_FIRST_50},14565,1,0`,
      `Mk3=Stimulus,${LOSS_CODE_FIRST_50},14565,1,0`,
      "Mk4=Stimulus,S444,57125,1,0",
      `Mk5=Stimulus,${WIN_CODE_FIRST_50},14565,1,0`,
      "",
      "",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  })
});
