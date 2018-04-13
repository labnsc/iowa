import { isLineWithoutStimulus, stimulusCode, replaceLineWithCode } from './lineHelpers';

const WIN_CODE = '333';
const POST_WIN_CODE = '444';

const LOSS_CODE = '111';
const LOSSES = [
  1002,
  1004,
  1006,
  1008,
  1009,
  1011,
  1013,
  1014,
  1016,
  1017,
  1020,
  1022,
  1024,
  1025,
  1026,
  1030,
  1032,
  1033,
  1036,
  1037,
  3008,
  3013,
  3020,
  3032,
  5002,
  5004,
  5006,
  5008,
  5009,
  5011,
  5012,
  5016,
  5017,
  5019,
  5023,
  5024,
  5025,
  5028,
  5029,
  5033,
  5034,
  5036,
  5038,
  5039,
  7009,
  7019,
  7028,
  7034,
];

const POST_LOSS_CODE = '222';
const POST_LOSSES = [
  2002,
  2004,
  2006,
  2008,
  2009,
  2011,
  2013,
  2014,
  2016,
  2017,
  2020,
  2022,
  2024,
  2025,
  2026,
  2030,
  2032,
  2033,
  2036,
  2037,
  4008,
  4013,
  4020,
  4032,
  6002,
  6004,
  6006,
  6008,
  6009,
  6011,
  6012,
  6016,
  6017,
  6019,
  6023,
  6024,
  6025,
  6028,
  6029,
  6033,
  6034,
  6036,
  6038,
  6039,
  8009,
  8019,
  8028,
  8034,
];

const parsedLineWithCode = (line, code) => {
  const parsedLine = replaceLineWithCode(line, code);
  return`${parsedLine}\n`;
};

const winAndLoss = contents => {
  const lines = contents.split("\n");
  let output = '';

  lines.forEach(line => {
    if (isLineWithoutStimulus(line)) {
      output += `${line}\n`;
      return;
    }

    const code = parseInt(stimulusCode(line), 10);

    if (LOSSES.indexOf(code) !== -1) {
      output += parsedLineWithCode(line, LOSS_CODE);
      return;
    }

    if (POST_LOSSES.indexOf(code) !== -1) {
      output += parsedLineWithCode(line, POST_LOSS_CODE);
      return;
    }

    if (code >= 1000) {
      const codeFirstNum = code.toString()[0];

      if(["1", "3", "5", "7"].indexOf(codeFirstNum) !== -1) {
        output += parsedLineWithCode(line, WIN_CODE);
        return;
      }

      if(["2", "4", "6", "8"].indexOf(codeFirstNum) !== -1) {
        output += parsedLineWithCode(line, POST_WIN_CODE);
        return;
      }
    }

    output += `${line}\n`;
  });

  return output;
};

export default winAndLoss;
