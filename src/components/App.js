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
    operation: ""
  };

  buttonPressed = e => {
    const numbers = calcButtons.slice(0, 10);
    const operation = calcButtons.slice(10, 15);
    const CE = calcButtons.slice(-1);
    const view = e.target.innerText;

    if (numbers.indexOf(view) !== -1 || view === ".") {
      this.setState(prevState => ({
        view: prevState.view + view
      }));
    }

    if (CE.indexOf(view) !== -1) {
      this.setState(prevState => ({
        view: "",
        memory: 0,
        operationCount: 0
      }));
    }

    if (operation.indexOf(view) !== -1) {
      // if (this.state.operationCount < 2) {
      //   this.setState(prevState => ({
      //     view: "",
      //     memory: parseInt(prevState.view),
      //     operationCount: prevState.operationCount + 1
      //   }));
      // } else

      switch (view) {
        case "+":
          this.setState(prevState => ({
            view: "",
            memory: prevState.memory + parseFloat(prevState.view),
            operationCount: prevState.operationCount + 1
          }));
          break;
        case "-":
          this.setState(prevState => ({
            view: "",
            memory: prevState.memory - parseFloat(prevState.view),
            operationCount: prevState.operationCount + 1
          }));
          break;
        case "*":
          this.setState(prevState => ({
            view: "",
            memory: prevState.memory * parseFloat(prevState.view),
            operationCount: prevState.operationCount + 1
          }));
          break;

        case "/":
          this.setState(prevState => ({
            view: "",
            memory: prevState.memory / parseFloat(prevState.view),
            operationCount: prevState.operationCount + 1
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

      // if (view == "+") {
      //   this.setState(prevState => ({
      //     view: "",
      //     memory: prevState.memory + parseInt(prevState.view),
      //     operationCount: prevState.operationCount + 1
      //   }));
      // }
    }

    // if (view == "+" && this.state.operationCount >= 2) {
    //   this.setState(prevState => ({
    //     view: "",
    //     memory: prevState.memory + parseInt(prevState.view),
    //     operationCount: prevState.operationCount + 1
    //   }));
    // }
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
