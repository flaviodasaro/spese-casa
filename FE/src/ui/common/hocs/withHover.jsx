import "../styles/withHoverStyles.scss";

export const withHover = (
  tooltipText = "",
  otherPropsDiv = {}
) => WrappedComponent => wrappedComponentProps =>{
  return (
    <div className="tooltip" {...otherPropsDiv}>
      <WrappedComponent {...wrappedComponentProps} />
      <span className="tooltiptext">{tooltipText}</span>
    </div>
  );
};
