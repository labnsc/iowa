import React, { Component } from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import logo from './logo.svg';

import './App.css';

// TODO: Do parser
const parse = contents => {
  return contents;
};

const downloadZip = zip =>
  zip.generateAsync({ type: "blob" })
    .then(content => FileSaver.saveAs(content, "example.zip"));

class App extends Component {
  handleFiles = event => {
    const zip = new JSZip();

    Array.from(event.target.files).forEach((file, index, files) => {
      const reader = new FileReader();
      reader.onload = () => {
        const parsedContents = parse(reader.result);
        zip.file(file.name, parsedContents);

        if (index === files.length - 1) downloadZip(zip);
      };
      reader.readAsText(file);
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          <input type="file" id="input" multiple onChange={this.handleFiles} />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
