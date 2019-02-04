import React from "react";

export default function View(props) {
  return (
    <>
      <div className="showValue">{props.view}</div>
      <div className="showValue">{props.memory} =</div>
    </>
  );
}
