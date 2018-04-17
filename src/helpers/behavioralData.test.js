import behavioralData from './behavioralData';

describe('behavioralData()', () => {
  it('returns num of cards and balance', () => {
    const contents = [
      "0,A",
      "1,C",
      "2,C",
      "3,A",
    ].join("\n");

    const actual = behavioralData(contents);
    const expected = {
      numA: 2,
      numB: 0,
      numC: 2,
      numD: 0,
      balance: 2300,
    };

    expect(actual).toEqual(expected);
  });

  describe('when a loss occurs', () => {
    it('returns correct balance for A', () => {
      const contents = [
        "0,A",
        "1,A",
        "2,A",
        "3,A",
      ].join("\n");

      const actual = behavioralData(contents);
      const expected = {
        numA: 4,
        numB: 0,
        numC: 0,
        numD: 0,
        balance: 2250,
      };

      expect(actual).toEqual(expected);
    });

    it('returns correct balance for B', () => {
      const contents = [
        "0,B",
        "1,B",
        "2,B",
        "3,B",
        "4,B",
        "5,B",
        "6,B",
        "7,B",
        "8,B",
      ].join("\n");

      const actual = behavioralData(contents);
      const expected = {
        numA: 0,
        numB: 9,
        numC: 0,
        numD: 0,
        balance: 1650,
      };

      expect(actual).toEqual(expected);
    });

    it('returns correct balance for C', () => {
      const contents = [
        "0,C",
        "1,C",
        "2,C",
      ].join("\n");

      const actual = behavioralData(contents);
      const expected = {
        numA: 0,
        numB: 0,
        numC: 3,
        numD: 0,
        balance: 2100,
      };

      expect(actual).toEqual(expected);
    });

    it('returns correct balance for D', () => {
      const contents = [
        "0,D",
        "1,D",
        "2,D",
        "3,D",
        "4,D",
        "5,D",
        "6,D",
        "7,D",
        "8,D",
        "9,D",
      ].join("\n");

      const actual = behavioralData(contents);
      const expected = {
        numA: 0,
        numB: 0,
        numC: 0,
        numD: 10,
        balance: 2250,
      };

      expect(actual).toEqual(expected);
    });
  });
});
