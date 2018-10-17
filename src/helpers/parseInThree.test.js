import React from 'react';
import _ from 'lodash/fp';

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

  describe('when trialCount is more than 100', () => {
    it('changes S333 for S6666 for trial 100', () => {
      const contents = Array.from(Array(101).keys(), n =>
        `Mk${n}=Stimulus,S333,15323,1,0`
      ).join("\n");

      const actual = _.takeRight(2, parseInThree(contents).split('\n'));
      const expected = [
        "Mk100=Stimulus,S6666,15323,1,0",
        "",
      ]

      expect(actual).toEqual(expected);
    });
  });
});
