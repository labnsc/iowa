import {
  isLineWithoutStimulus,
  stimulusCode,
  replaceLineWithCode,
} from './lineHelpers';

const CODES_TO_CHANGE = ['111', '122', '133', '144'];

const CODES_MAP = {
  '111': '66',
  '122': '77',
  '133': '88',
  '144': '99',
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
    if (CODES_TO_CHANGE.includes(code)) {
      const changedLine = replaceLineWithCode(line, CODES_MAP[code]);
      output += `${changedLine}\n`;
      return;
    }

    output += `${line}\n`;
  });

  return output;
};

export default sanitizeTriggers;
