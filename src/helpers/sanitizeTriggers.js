import {
  isLineWithoutStimulus,
  stimulusCode,
  stimulusTime,
  replaceLineWithCode,
  replaceLineWithTime,
} from './lineHelpers';

const CODES_TO_DELETE = ['122', '111', '133', '144'];
const CODES_TO_CHANGE = ['23', '112', '134', '145'];

const CODES_MAP = {
  '23': '122',
  '112': '111',
  '134': '133',
  '145': '144',
};

const sanitizeTriggers = contents => {
  const lines = contents.split('\n');
  let output = '';

  lines.forEach(line => {
    if (isLineWithoutStimulus(line)) {
      output += `${line}\n`;
      return;
    }

    const code = stimulusCode(line);
    if (CODES_TO_DELETE.includes(code)) {
      return;
    }

    if (CODES_TO_CHANGE.includes(code)) {
      const changedLine = replaceLineWithCode(line, CODES_MAP[code]);
      if (code === '23') {
        output += `${changedLine}\n`;
        return;
      }

      const time = stimulusTime(line) - 2000;
      const finalLine = replaceLineWithTime(changedLine, time);
      output += `${finalLine}\n`;
      return;
    }


    output += `${line}\n`;
  });

  return output;
};

export default sanitizeTriggers;
