import React, { Component } from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import logo from './logo.svg';

import './App.css';

const stimulusCode = line => line.match(/S\s*(\d+)/)[1];

export const parse = contents => {
  let trialCount = 0;
  const lines = contents.split("\n");
  let output = '';

  lines.forEach(line => {
    if (!line.match(/^Mk\d+=S/i)) {
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

      const parsedLine = line.replace(/S\s*\d+/, `S${newCode}`);
      output += `${parsedLine}\n`;
    }
    else {
      output += `${line}\n`;
    }
  });

  return output;
};

const downloadZip = zip =>
  zip.generateAsync({ type: "blob" })
    .then(content => FileSaver.saveAs(content, "iowa-in-three.zip"));

class App extends Component {
  handleFiles = event => {
    const zip = new JSZip();
    const filesArray = Array.from(event.target.files);
    let processed = 0;

    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const parsedContents = parse(reader.result);
        zip.file(file.name, parsedContents);
        processed++;

        if (filesArray.length === processed) downloadZip(zip);
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
        <h3>IOWA in 3</h3>
        <p className="App-intro">
          Choose the <code>.vmrk</code> files you wish to convert
        </p>

        <p>
          <input type="file" id="input" multiple onChange={this.handleFiles} />
        </p>

        <hr/>
      </div>
    );
  }
}

export default App;
