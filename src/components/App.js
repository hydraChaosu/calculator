import React, { Component } from "react";
import "../App.css";
import "../styles/css/mystyles.css";
import View from "./View";
import Btn from "./Btn";
const calcButtons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "+",
  "-",
  "*",
  "/",
  "=",
  ".",
  "CE"
];
//StackOF
const operators = {
  "+": function(a, b) {
    return a + b;
  },
  "-": function(a, b) {
    return a - b;
  },
  "*": function(a, b) {
    return a * b;
  },
  "/": function(a, b) {
    return a / b;
  }
};
class App extends Component {
  state = {
    memory: 0,
    view: "",
    operationStarted: false,
    prevOperation: "",
    viewOn: false
  };

  buttonPressed = e => {
    const numbers = calcButtons.slice(0, 10);
    const operation = calcButtons.slice(10, 15);
    const CE = calcButtons.slice(-1);
    const buttonPressed = e.target.innerText;

    if (numbers.indexOf(buttonPressed) !== -1 || buttonPressed === ".") {
      if (buttonPressed === "." && this.state.view.includes(".")) {
        return;
      } else if (this.state.view == "0" && buttonPressed === "0") {
        this.setState(prevState => ({
          view: "0",
          viewOn: true
        }));
      } else if (this.state.operationStarted) {
        this.setState(prevState => ({
          view: buttonPressed,
          operationStarted: false,
          viewOn: true
        }));
      } else {
        this.setState(prevState => ({
          view: prevState.view + buttonPressed,
          operationStarted: false,
          viewOn: true
        }));
      }
    }

    if (CE.indexOf(buttonPressed) !== -1) {
      this.setState(prevState => ({
        view: "",
        memory: 0,
        operationStarted: false,
        prevOperation: "",
        viewOn: true
      }));
    }

    if (operation.indexOf(buttonPressed) !== -1 && this.state.view !== "") {
      if (this.state.prevOperation === "=") {
        return;
      }

      switch (buttonPressed) {
        case "=":
          this.setState(prevState => ({
            memory: operators[prevState.prevOperation](
              prevState.memory,
              parseFloat(prevState.view)
            ),
            view: "",
            prevOperation: "=",
            viewOn: false
          }));
          break;
        default:
          this.setState(prevState => ({
            view: "",
            memory:
              prevState.memory !== 0
                ? operators[this.state.prevOperation](
                    prevState.memory,
                    parseFloat(prevState.view)
                  )
                : parseFloat(prevState.view),
            operationStarted: true,
            prevOperation: buttonPressed,
            viewOn: false
          }));
          break;
      }
    } else if (operation.indexOf(buttonPressed) !== -1) {
      this.setState(prevState => ({
        prevOperation: buttonPressed,
        viewOn: false
      }));
    }
  };

  render() {
    const { memory, view } = this.state;
    const Buttons = calcButtons.map(item => (
      <Btn btn={item} key={item} buttonPressed={this.buttonPressed} />
    ));
    return (
      <div className="main">
        <div className="calc">
          <View
            view={view}
            memory={memory}
            viewOn={this.state.viewOn}
            operation={this.state.prevOperation}
          />
          {Buttons}
        </div>
      </div>
    );
  }
}

export default App;
