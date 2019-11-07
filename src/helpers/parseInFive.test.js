import React from 'react';
import _ from 'lodash/fp';

import parseInFive from './parseInFive';

describe('parseInFive()', () => {
  it('changes S333 for S2222', () => {
    const contents = [
      "Brain Vision",
      "Mk2=Stimulus,S  5,13723,1,0",
      "Mk3=Stimulus,S  1,13724,1,0",
      "Mk4=Stimulus,S 11,14565,1,0",
      "Mk5=Stimulus,S333,15323,1,0",
    ].join("\n");

    const actual = parseInFive(contents);
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

  describe('when trialCount is more than 20', () => {
    it('changes S333 for S4444 for trial 20', () => {
      const contents = Array.from(Array(21).keys(), n =>
        `Mk${n}=Stimulus,S333,15323,1,0`
      ).join("\n");

      const actual = _.takeRight(2, parseInFive(contents).split('\n'));
      const expected = [
        "Mk20=Stimulus,S4444,15323,1,0",
        "",
      ];

      expect(actual).toEqual(expected);
    });
  });
});
