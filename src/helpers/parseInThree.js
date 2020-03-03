import { isLineWithoutStimulus, stimulusCode, replaceLineWithCode } from './lineHelpers';

const parseInThree = contents => {
  let trialCount = 0;
  const lines = contents.split("\n");
  let output = '';

  lines.forEach(line => {
    if (isLineWithoutStimulus(line)) {
      output += `${line}\n`;
      return;
    }
    const code = stimulusCode(line);

    if (code === '333' || code === '111') {
      trialCount++;
      let newCode;

      switch(true) {
        case trialCount <= 50:
          newCode = code === '333' ? '22' : '11';
          break;
        case trialCount <= 100:
          newCode = code === '333' ? '44' : '33';
          break;
        default:
          newCode = code === '333' ? '66' : '55';
      }

      const parsedLine = replaceLineWithCode(line, newCode);
      output += `${parsedLine}\n`;
    }
    else {
      output += `${line}\n`;
    }
  });

  return output;
};

export default parseInThree;
