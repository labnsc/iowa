import winAndLoss from './winAndLoss';

describe('winAndLoss()', () => {
  it('does not change if code is not a win/loss', () => {
    const contents = [
      "Brain Vision",
      "Mk142=Stimulus,S127,51542,1,0",
    ].join("\n");

    const actual = winAndLoss(contents);
    const expected = [
      "Brain Vision",
      "Mk142=Stimulus,S127,51542,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });

  describe('PRE loss:', () => {
    it('changes it for LOSS code', () => {
      const contents = [
        "Mk142=Stimulus,S1002,51542,1,0",
      ].join("\n");

      const actual = winAndLoss(contents);
      const expected = [
        "Mk142=Stimulus,S111,51542,1,0",
        "",
      ].join("\n");

      expect(actual).toEqual(expected);
    });

    it('for B changes it for LOSS code', () => {
      const contents = [
        "Mk142=Stimulus,S3008,51542,1,0",
      ].join("\n");

      const actual = winAndLoss(contents);
      const expected = [
        "Mk142=Stimulus,S111,51542,1,0",
        "",
      ].join("\n");

      expect(actual).toEqual(expected);
    });
  });

  it('POST loss: changes it for POST LOSS code', () => {
    const contents = [
      "Mk142=Stimulus,S2002,51542,1,0",
    ].join("\n");

    const actual = winAndLoss(contents);
    const expected = [
      "Mk142=Stimulus,S222,51542,1,0",
      "",
    ].join("\n");

    expect(actual).toEqual(expected);
  });

  describe('PRE win:', () => {
    it('changes it for WIN code', () => {
      const contents = [
        "Mk142=Stimulus,S1000,51542,1,0",
        "Mk142=Stimulus,S3000,51542,1,0",
      ].join("\n");

      const actual = winAndLoss(contents);
      const expected = [
        "Mk142=Stimulus,S333,51542,1,0",
        "Mk142=Stimulus,S333,51542,1,0",
        "",
      ].join("\n");

      expect(actual).toEqual(expected);
    });
  });

  describe('POST win:', () => {
    it('changes it for POST WIN code', () => {
      const contents = [
        "Mk142=Stimulus,S2000,51542,1,0",
        "Mk142=Stimulus,S4000,51542,1,0",
      ].join("\n");

      const actual = winAndLoss(contents);
      const expected = [
        "Mk142=Stimulus,S444,51542,1,0",
        "Mk142=Stimulus,S444,51542,1,0",
        "",
      ].join("\n");

      expect(actual).toEqual(expected);
    });
  });
});
