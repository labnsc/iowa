import { getSubjectNumber } from './fileHelpers';

describe('getSubjectNumber()', () => {
  it('returns subject number', () => {
    const fileName = "026-1-IOWA-logCards.csv";

    const actual = getSubjectNumber(fileName);
    const expected = "MJ026";

    expect(actual).toEqual(expected);
  });
});
