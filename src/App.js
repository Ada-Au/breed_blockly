import React from "react";
import "./App.css";

import BlocklyComponent, { Block, Value, Field, Shadow } from "./Blockly";

import Blockly from "blockly";
import BlocklyJS from "blockly/javascript";

import "./blocks/customblocks";
import "./generator/generator";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    console.log(code);
  };

  generateXML = () => {
    var xmlDom = Blockly.Xml.workspaceToDom(
      this.simpleWorkspace.current.workspace
    );
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom); // this is what upload to firebase
    var Textxml = Blockly.Xml.textToDom(xmlText);
    console.log(xmlDom, xmlText, Textxml);
  };

  runCode = () => {
    try {
      eval(BlocklyJS.workspaceToCode(this.simpleWorkspace.current.workspace));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.generateCode}>Convert</button>
        <button onClick={this.runCode}>Run</button>
        <button onClick={this.generateXML}>generate XML</button>
        <BlocklyComponent
          ref={this.simpleWorkspace}
          readOnly={false}
          trashcan={true}
          media={"media/"}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
        >
          <Block type="test_react_field" />
          <Block type="test_react_date_field" />
          <Block type="controls_ifelse" />
          <Block type="logic_compare" />
          <Block type="logic_operation" />
          <Block type="logic_operation" />
          <Block type="logic_negate" />
          <Block type="logic_boolean" />
          <Block type="logic_null" disabled="true" />
          <Block type="logic_ternary" />
        </BlocklyComponent>
      </div>
    );
  }
}

export default App;
