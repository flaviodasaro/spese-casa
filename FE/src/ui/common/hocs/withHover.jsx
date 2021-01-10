import "../styles/withHoverStyles.scss";

export const withHover = (
  tooltipText = "",
  otherPropsDiv = {},
  otherSpanProps = {}
) => WrappedComponent => wrappedComponentProps =>{
  return (
    <div className="tooltip" {...otherPropsDiv}>
      <WrappedComponent {...wrappedComponentProps} />
      <span className="tooltiptext" { ...otherSpanProps }>{tooltipText}</span>
    </div>
  );
};

/* export const withHoverAdvanced = () => (WrappedComponent, ) => wrappedComponentProps =>{

} */