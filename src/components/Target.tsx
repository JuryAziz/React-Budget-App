import React, { useEffect, useState } from "react";

const Target = ( props: { savingAmount: number;  }) => {
  const [target, setTarget] = useState(0);
  const [saving, setSavings] = useState(0);

  useEffect(() => {
    setSavings(props.savingAmount);
  });
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    ev.preventDefault();

    setTarget(Number(ev.target.value));
  };



  return (
    <section>
      <form onSubmit={() => setTarget(0)}>
        <div>
          <label htmlFor="target"> Set target </label>
          <input value={target} onChange={onChange} id="target" type="number" />
        </div>
        <button type="submit" id="reset-btn">
          Reset
        </button>
        <div>
          <p>Current Saving : {saving}</p>
          <p>Target : {target}</p>
        </div>
        {/* progress bar  */}
      </form>
    </section>
  );
};

export default Target;
