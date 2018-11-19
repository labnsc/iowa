import sanitizeTriggers from './sanitizeTriggers';

describe('sanitizeTriggers()', () => {
  it('deletes S122, S111, S133, S144 codes', () => {
    const contents = [
      "Brain Vision",
      "Mk4=Stimulus,S12345,14565,1,0",
      "Mk4=Stimulus,S111,14565,1,0",
      "Mk4=Stimulus,S122,14565,1,0",
      "Mk4=Stimulus,S133,14565,1,0",
      "Mk4=Stimulus,S144,14565,1,0",
      "Mk4=Stimulus,S982,14565,1,0",
    ].join("\n");

    const actual = sanitizeTriggers(contents);
    const expected = [
      "Brain Vision",
      "Mk4=Stimulus,S12345,14565,1,0",
      "Mk4=Stimulus,S982,14565,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });

  it('changes specific codes & subtract 2000 ms', () => {
    const contents = [
      "Brain Vision",
      "Mk4=Stimulus,S 23,14565,1,0",
      "Mk4=Stimulus,S112,14565,1,0",
      "Mk4=Stimulus,S134,14565,1,0",
      "Mk4=Stimulus,S145,14565,1,0",
    ].join("\n");

    const actual = sanitizeTriggers(contents);
    const expected = [
      "Brain Vision",
      "Mk4=Stimulus,S122,14565,1,0",
      "Mk4=Stimulus,S111,12565,1,0",
      "Mk4=Stimulus,S133,12565,1,0",
      "Mk4=Stimulus,S144,12565,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });
});
