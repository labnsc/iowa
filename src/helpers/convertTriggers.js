import { isLineWithoutStimulus, stimulusCode, replaceLineWithCode } from './lineHelpers';

const initMapper = () => ({
  '111': {
    index: 1000,
    count: 0
  },
  '112': {
    index: 2000,
    count: 0
  },
  '122': {
    index: 3000,
    count: 0
  },
  '123': {
    index: 4000,
    count: 0
  },
  '133': {
    index: 5000,
    count: 0
  },
  '134': {
    index: 6000,
    count: 0,
  },
  '144': {
    index: 7000,
    count: 0
  },
  '145': {
    index: 8000,
    count: 0
  }
});


const convertTriggers = contents => {
  const mapper = initMapper();
  const lines = contents.split("\n");
  let output = '';

  lines.forEach(line => {
    if (isLineWithoutStimulus(line)) {
      output += `${line}\n`;
      return;
    }

    const code = stimulusCode(line);

    if (mapper.hasOwnProperty(code)) {
      const newCode = mapper[code].index + mapper[code].count;
      mapper[code].count += 1;

      const parsedLine = replaceLineWithCode(line, newCode);
      output += `${parsedLine}\n`;
    } else {
      output += `${line}\n`;
    }
  });

  return output;
};

export default convertTriggers;
