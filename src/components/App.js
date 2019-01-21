import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import "../styles/css/mystyles.css";
import Something from "./Something";

class App extends Component {
  state = {
    name: "kot",
    surname: "bialy"
  };

  render() {
    const { name, surname } = this.state;
    return (
      <div>
        {name}
        <Something catColor={surname} />
      </div>
    );
  }
}

export default App;
