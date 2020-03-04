import sanitizeTriggers from './sanitizeTriggers';

describe('sanitizeTriggers()', () => {
  it('changes specific codes', () => {
    const contents = [
      "Brain Vision",
      "Mk4=Stimulus,S111,14565,1,0",
      "Mk4=Stimulus,S122,14565,1,0",
      "Mk4=Stimulus,S133,14565,1,0",
      "Mk4=Stimulus,S144,14565,1,0",
    ].join("\n");

    const actual = sanitizeTriggers(contents);
    const expected = [
      "Brain Vision",
      "Mk4=Stimulus,S66,14565,1,0",
      "Mk4=Stimulus,S77,14565,1,0",
      "Mk4=Stimulus,S88,14565,1,0",
      "Mk4=Stimulus,S99,14565,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });
});
