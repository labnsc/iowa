export const isLineWithoutStimulus = line => !line.match(/^Mk\d+=S/i);
export const stimulusCode = line => line.match(/S\s*(\d+)/)[1];
export const stimulusTime = line => line.match(/S\s*\d+,(\d+)/)[1];
export const replaceLineWithCode = (line, code) => line.replace(/S\s*\d+/, `S${code}`);
export const replaceLineWithTime = (line, time) => line.replace(/,\d{3,},/, `,${time},`);
