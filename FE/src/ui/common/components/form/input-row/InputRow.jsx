import "./InputRow.scss";

export const InputRow = ({ Component1, Component2, centerIfSingle, marginBottom }) => {
  const centerClassName =
    centerIfSingle && !Component2 && !!Component1 ? " center-all" : "";
  return (
    <div className={`input-row${centerClassName}`} style={{ marginBottom }}>
      {Component1}
      {Component2}
    </div>
  );
};

InputRow.defaultProps = {
  centerIfSingle: true,
  marginBottom:"10px"
};
