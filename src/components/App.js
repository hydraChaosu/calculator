import React, { Component } from "react";
import "../App.css";
import "../styles/css/mystyles.css";
import View from "./View";
import Btn from "./Btn";
//niekontrolowany komponent
//zamiast e.target value robimy referencje
//w kontorolowanym komponencie używamy  e.taregt.vale
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
class App extends Component {
  state = {
    memory: 0,
    view: "",
    operationCount: 0,
    operationStarted: false,
    pressed: ""
  };

  buttonPressed = e => {
    const numbers = calcButtons.slice(0, 10);
    const operation = calcButtons.slice(10, 15);
    const CE = calcButtons.slice(-1);
    const buttonPressed = e.target.innerText;
    const view = "";
    if (numbers.indexOf(buttonPressed) !== -1 || buttonPressed === ".") {
      if (this.state.view == "0" && numbers.indexOf(buttonPressed) !== -1) {
        this.setState(prevState => ({
          view: "0"
        }));
      } else if (this.state.operationStarted) {
        console.log("started");
        this.setState(prevState => ({
          view: buttonPressed,
          operationStarted: false
        }));
      } else {
        this.setState(prevState => ({
          view: prevState.view + buttonPressed,
          operationStarted: false
        }));
      }
    }

    if (CE.indexOf(buttonPressed) !== -1) {
      this.setState(prevState => ({
        view: "",
        memory: 0,
        operationCount: 0,
        operationStarted: false,
        pressed: ""
      }));
    }

    if (operation.indexOf(buttonPressed) !== -1) {
      switch (buttonPressed) {
        case "+":
          this.setState(prevState => ({
            memory: prevState.memory + parseFloat(prevState.view),
            operationCount: prevState.operationCount + 1,
            operationStarted: true
          }));
          break;
        case "-":
          this.setState(prevState => ({
            memory:
              prevState.memory !== 0
                ? prevState.memory - parseFloat(prevState.view)
                : parseFloat(prevState.view),
            operationCount: prevState.operationCount + 1,
            operationStarted: true
          }));
          break;
        case "*":
          this.setState(prevState => ({
            memory:
              prevState.memory !== 0
                ? prevState.memory * parseFloat(prevState.view)
                : parseFloat(prevState.view),
            operationCount: prevState.operationCount + 1,
            operationStarted: true
          }));
          break;

        case "/":
          this.setState(prevState => ({
            memory:
              prevState.memory !== 0
                ? prevState.memory / parseFloat(prevState.view)
                : parseFloat(prevState.view),
            operationCount: prevState.operationCount + 1,
            operationStarted: true
          }));
          break;

        case "=":
          this.setState(prevState => ({
            view: prevState.memory,
            operationCount: prevState.operationCount + 1
          }));
          break;
        default:
          break;
      }
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
          <View view={view} />
          {Buttons}
        </div>
      </div>
    );
  }
}

export default App;
