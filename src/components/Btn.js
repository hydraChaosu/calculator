import React, { Component } from "react";

export default function View(props) {
  return (
    <button onClick={props.buttonPressed} className="btn">
      {props.btn}
    </button>
  );
}
