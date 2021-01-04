import "./InputRow.scss";

export const InputRow = ({Component1, Component2, settings}) => {
  const { centerIfSingle } = settings;
  const centerClassName = centerIfSingle && !Component2 && !!Component1 ? " center-all" : ""
  return (
    <div className={`input-row${centerClassName}`}>
      {Component1}
      {Component2}
    </div>
  );
};

InputRow.defaultProps = {
  settings:{ centerIfSingle: true }
}