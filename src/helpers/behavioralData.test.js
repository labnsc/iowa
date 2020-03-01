import behavioralData from './behavioralData';

const createNContents = (n, letter) =>
  Array(n).fill().map((_v,i)=> `${i},${letter}`).join("\n");

describe('behavioralData()', () => {
  it('returns num of cards and balance', () => {
    const contents = [
      "0,A",
      "1,C ",
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
      balancePart1: 0,
      balancePart2: 0,
      balancePart3: 0,
    };

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  describe('results per block', () => {
    it('returns balance per block', () => {
      const contents = createNContents(150, 'B');

      const actual = behavioralData(contents);
      const expected = {
        numA: 0,
        numB: 150,
        numC: 0,
        numD: 0,
        balance: 12000,
        balancePart1: 2000,
        balancePart2: 7000,
        balancePart3: 12000,
      };

      expect(actual).toEqual(expect.objectContaining(expected));
    });

    it('returns cards per block', () => {
      const contents = createNContents(150, 'B');

      const actual = behavioralData(contents);
      const expected = {
        numAPart1: 0,
        numBPart1: 50,
        numCPart1: 0,
        numDPart1: 0,
        numAPart2: 0,
        numBPart2: 50,
        numCPart2: 0,
        numDPart2: 0,
        numAPart3: 0,
        numBPart3: 50,
        numCPart3: 0,
        numDPart3: 0,
      };

      expect(actual).toEqual(expect.objectContaining(expected));
    });
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

      expect(actual).toEqual(expect.objectContaining(expected));
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

      expect(actual).toEqual(expect.objectContaining(expected));
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

      expect(actual).toEqual(expect.objectContaining(expected));
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

      expect(actual).toEqual(expect.objectContaining(expected));
    });
  });
});
