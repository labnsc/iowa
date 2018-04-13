import React from 'react';
import ReactDOM from 'react-dom';
import App, { parseInThree, parseOnSteroids } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('parseOnSteroids()', () => {
  it('uses all of 3 parsers for getting data ready for Brain Vision', () => {
    const contents = [
      "Brain Vision",
      "Mk1=Stimulus,S111,14565,1,0",
      "Mk2=Stimulus,S111,14565,1,0",
      "Mk3=Stimulus,S111,14565,1,0",
      "Mk4=Stimulus,S123456,14565,1,0",
    ].join("\n");

    const actual = parseOnSteroids(contents);
    const expected = [
      "Brain Vision",
      "Mk1=Stimulus,S22,14565,1,0", // S22 win code for the first 50 trials
      "Mk2=Stimulus,S22,14565,1,0",
      "Mk3=Stimulus,S11,14565,1,0", // S11 loss code for the first 50 trials
      "Mk4=Stimulus,S22,14565,1,0",
      "",
      "",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  })
});

describe('parseInThree()', () => {
  it('changes S333 for S22', () => {
    const contents = [
      "Brain Vision",
      "Mk2=Stimulus,S  5,13723,1,0",
      "Mk3=Stimulus,S  1,13724,1,0",
      "Mk4=Stimulus,S 11,14565,1,0",
      "Mk5=Stimulus,S333,15323,1,0",
    ].join("\n");

    const actual = parseInThree(contents);
    const expected = [
      "Brain Vision",
      "Mk2=Stimulus,S  5,13723,1,0",
      "Mk3=Stimulus,S  1,13724,1,0",
      "Mk4=Stimulus,S 11,14565,1,0",
      "Mk5=Stimulus,S22,15323,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });
});
