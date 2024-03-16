const ProgressBar = (props: { targetSaving: number; currentSaving: number }) => {

  const progress : number = (props.currentSaving / props.targetSaving) * 100;

  return (
    <div>
      <p>
        Progress:{props.currentSaving !== 0 ? (progress > 100 ? 100 : progress.toFixed(0)) : 0}%
      </p>
      <progress
        value={props.currentSaving}
        max={props.targetSaving}></progress>
    </div>
  );
};

export default ProgressBar;
