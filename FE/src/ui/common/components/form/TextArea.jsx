import { useState, useEffect } from "react";

const EmptyTextArea = () => {
  return <textarea placeholder="Loading..."></textarea>;
};

export const TextArea = ({ value, ...otherProps }) => {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue("");
    setTimeout(() => {
      setLocalValue(value);
    }, 100);
  }, [value]);

  return (
    <>
      {localValue ? (
        <textarea {...otherProps} defaultValue={localValue}></textarea>
      ) : (
        <EmptyTextArea />
      )}
    </>
  );
};
