import React, { FormEvent, useRef, useState } from "react";

const Target = (props: { target: number }) => {
  const [target, setTarget] = useState<any>(0);
  props.target = target;
  //   const resetTarget = (ev: FormEvent<HTMLFormElement>) => {
  //     ev.preventDefault();
  //     setTarget(0);
  //   };

  return (
    <section>
      <form onSubmit={(ev) => setTarget(0)}>
        <div>
          <label htmlFor="target"> Set target </label>
          <input
            value={target}
            onChange={(ev) => setTarget(ev.target.value)}
            id="target"
            type="text"
          />
        </div>
        <button type="submit" id="reset-btn">
          Reset
        </button>
        <div>
          <p>Current Saving : {0}</p>
          <p>Target : {target}</p>
        </div>
        {/* progress bar  */}
      </form>
    </section>
  );
};

export default Target;
