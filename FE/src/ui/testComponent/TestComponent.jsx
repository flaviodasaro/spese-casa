import React from "react";

const TestComponent = (props) => {
  const { input, testDispatch, normalInput } = props;
  return (
    <div>
      <h1>{normalInput}</h1>
      <p>
        <span>{input}</span>
      </p>
      <p>
        <button
          onClick={(event) => {
            testDispatch(input + "1");
          }}
        >
          sklasklfj
        </button>
      </p>
    </div>
  );
};

export default TestComponent;
