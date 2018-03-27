import React from 'react';
import ReactDOM from 'react-dom';
import App, { parse } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('parse()', () => {
  it('changes S333 for S22', () => {
    const contents = [
      "Brain Vision",
      "Mk2=Stimulus,S  5,13723,1,0",
      "Mk3=Stimulus,S  1,13724,1,0",
      "Mk4=Stimulus,S 11,14565,1,0",
      "Mk5=Stimulus,S333,15323,1,0",
    ].join("\n");

    const actual = parse(contents);
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
