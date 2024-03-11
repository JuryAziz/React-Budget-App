import React from "react";

const ProgressBar = (props: {
  targetSaving: number;
  currentSaving: number;
}) => {
  return (
      <div>
          <p> Progress: {props.currentSaving !== 0 ? (props.currentSaving / props.targetSaving * 100).toFixed(0): 0}% </p>
      <progress value={props.currentSaving} max={props.targetSaving}></progress>
    </div>
  );
};

export default ProgressBar;
