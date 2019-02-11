import React from "react";

export default function View(props) {
  return (
    <>
      {props.viewOn ? (
        <div className="showValue">{props.view}</div>
      ) : (
        <div className="showValue">
          {props.memory} {props.operation}
        </div>
      )}
    </>
  );
}
