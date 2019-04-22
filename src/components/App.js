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
  ".",
  "+",
  "-",
  "*",
  "/",
  "=",
  "**",
  "sqrt",
  "CE"
];

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
  },
  "**": function(a, b) {
    return a ** b;
  },
  sqrt: function(a, b) {
    return Math.pow(a, 1 / b);
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
    const numbers = calcButtons.slice(0, 11);
    const operation = calcButtons.slice(11, 18);
    const CE = calcButtons.slice(-1);
    const buttonPressed = e.target.innerText;
    let canEQatFirst = false;
    // duplicate .
    // duplicat 0
    // show what you clicked after operation is pressed
    // add numbers to view
    if (numbers.indexOf(buttonPressed) !== -1) {
      if (
        buttonPressed === "." &&
        (this.state.view.includes(".") || this.state.view === "")
      ) {
        return;
      } else if (this.state.view === "0" && buttonPressed === "0") {
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
    //add prevoperation before operation if empty
    if (
      operation.indexOf(buttonPressed) !== -1 &&
      this.state.prevOperation === ""
    ) {
      this.setState(prevState => ({
        prevOperation: buttonPressed === "=" ? "" : buttonPressed,
        viewOn: false
      }));
      canEQatFirst = true;
    }
    //do math and add operation if not empty
    if (operation.indexOf(buttonPressed) !== -1 && this.state.view !== "") {
      switch (buttonPressed) {
        case "=":
          if (canEQatFirst) {
            this.setState(prevState => ({
              viewOn: true
            }));
            break;
          }
          this.setState(prevState => ({
            memory: operators[prevState.prevOperation](
              prevState.memory,
              parseFloat(prevState.view)
            ),
            view: "",
            prevOperation: "",
            viewOn: false
          }));
          break;
        default:
          this.setState(prevState => ({
            // if memory 0'starting point of calc' then dont do ** and sqrt becouse it reslove it as 0 just add and take it as first parametr
            view: "",
            memory:
              prevState.memory === 0 &&
              (prevState.prevOperation === "**" ||
                prevState.prevOperation === "sqrt" ||
                prevState.prevOperation === "*" ||
                prevState.prevOperation === "/")
                ? parseFloat(prevState.view)
                : operators[prevState.prevOperation](
                    prevState.memory,
                    parseFloat(prevState.view)
                  ),

            operationStarted: true,
            prevOperation: buttonPressed,
            viewOn: false
          }));
          break;
      }
    } else if (operation.indexOf(buttonPressed) !== -1) {
      this.setState(prevState => ({
        prevOperation: buttonPressed === "=" ? "" : buttonPressed,
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
// = cant be first operation error
