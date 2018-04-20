import convertTriggers from './convertTriggers';

describe('convertTriggers()', () => {
  it('changes S111 for S1000', () => {
    const contents = [
      "Brain Vision",
      "Mk4=Stimulus,S12345,14565,1,0",
      "Mk4=Stimulus,S111,14565,1,0",
    ].join("\n");

    const actual = convertTriggers(contents);
    const expected = [
      "Brain Vision",
      "Mk4=Stimulus,S12345,14565,1,0",
      "Mk4=Stimulus,S1000,14565,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });

  it('changes S112 for S2001 when appearing for second time', () => {
    const contents = [
      "Mk4=Stimulus,S112,14565,1,0",
      "Mk4=Stimulus,S112,14565,1,0",
    ].join("\n");

    const actual = convertTriggers(contents);
    const expected = [
      "Mk4=Stimulus,S2000,14565,1,0",
      "Mk4=Stimulus,S2001,14565,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });

  it('changes S145 for S8000', () => {
    const contents = [
      "Mk4=Stimulus,S145,14565,1,0",
    ].join("\n");

    const actual = convertTriggers(contents);
    const expected = [
      "Mk4=Stimulus,S8000,14565,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });
});
