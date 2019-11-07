import { isLineWithoutStimulus, stimulusCode, replaceLineWithCode } from './lineHelpers';

const parseInFive = contents => {
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
        case trialCount <= 20:
          newCode = code === '333' ? '2222' : '1111';
          break;
        case trialCount <= 40:
          newCode = code === '333' ? '4444' : '3333';
          break;
        case trialCount <= 60:
          newCode = code === '333' ? '6666' : '5555';
          break;
        case trialCount <= 80:
          newCode = code === '333' ? '8888' : '7777';
          break;
        case trialCount <= 100:
          newCode = code === '333' ? '10000' : '9999';
          break;
        default:
          newCode = code === '333' ? '12000' : '11000';
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

export default parseInFive;
