import React from 'react';

import parseInThree from './parseInThree';

describe('parseInThree()', () => {
  it('changes S333 for S2222', () => {
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
      "Mk5=Stimulus,S2222,15323,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });
});
