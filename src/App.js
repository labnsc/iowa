import React, { Component } from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import { isLineWithoutStimulus, stimulusCode, replaceLineWithCode } from './helpers/lineHelpers';
import convertTriggers from './helpers/convertTriggers';
import winAndLoss from './helpers/winAndLoss';
import behavioralData from './helpers/behavioralData';
import { getSubjectNumber } from './helpers/fileHelpers';
import logo from './logo.svg';

import './App.css';

export const parseInThree = contents => {
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

export const parseOnSteroids = contents =>
  parseInThree(winAndLoss(convertTriggers(contents)));

const downloadZip = zip =>
  zip.generateAsync({ type: "blob" })
    .then(content => FileSaver.saveAs(content, "iowa-parsed.zip"));

class App extends Component {
  handleFiles = event => {
    const zip = new JSZip();
    const filesArray = Array.from(event.target.files);
    let processed = 0;

    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const parsedContents = parseOnSteroids(reader.result);
        zip.file(file.name, parsedContents);
        processed++;

        if (filesArray.length === processed) downloadZip(zip);
      };
      reader.readAsText(file);
    });
  };

  handleBehaviorFiles = event => {
    const filesArray = Array.from(event.target.files);
    let processed = 0;
    let content = [
      'Subject',
      'Balance',
      'Balance-Block-1',
      'Balance-Block-2',
      'Balance-Block-3',
      'Card-A',
      'Card-A-Block-1',
      'Card-A-Block-2',
      'Card-A-Block-3',
      'Card-B',
      'Card-B-Block-1',
      'Card-B-Block-2',
      'Card-B-Block-3',
      'Card-C',
      'Card-C-Block-1',
      'Card-C-Block-2',
      'Card-C-Block-3',
      'Card-D',
      'Card-D-Block-1',
      'Card-D-Block-2',
      'Card-D-Block-3',
    ].join(',');
    content += "\n";

    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const subjectNumber = getSubjectNumber(file.name);
        const data = behavioralData(reader.result);
        content += [
          subjectNumber,
          data.balance,
          data.balancePart1,
          data.balancePart2,
          data.balancePart3,
          data.numA,
          data.numAPart1,
          data.numAPart2,
          data.numAPart3,
          data.numB,
          data.numBPart1,
          data.numBPart2,
          data.numBPart3,
          data.numC,
          data.numCPart1,
          data.numCPart2,
          data.numCPart3,
          data.numD,
          data.numDPart1,
          data.numDPart2,
          data.numDPart3,
        ].join(',');
        content += "\n";

        processed++;

        if (filesArray.length === processed) {
          const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
          FileSaver.saveAs(blob, "behavioralData.csv");
        }
      };
      reader.readAsText(file);
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Labnsc scripts</h1>
        </header>

        <h1>IOWA</h1>
        <h3>IOWA parsed</h3>
        <p className="App-intro">
          Choose the <code>.vmrk</code> files you wish to convert
        </p>

        <p>
          <input type="file" id="input" multiple onChange={this.handleFiles} />
        </p>

        <hr/>

        <h3>IOWA behavior data</h3>
        <p className="App-intro">
          Choose the <code>.csv</code> files
        </p>

        <p>
          <input type="file" id="input" multiple onChange={this.handleBehaviorFiles} />
        </p>
      </div>
    );
  }
}

export default App;
