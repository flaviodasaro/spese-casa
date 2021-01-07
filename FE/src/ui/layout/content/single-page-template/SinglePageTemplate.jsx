import { useEffect } from "react";
import { withNamespaces } from "react-i18next";
import "./SinglePageTemplate.scss";

const getWrapperClassName = (inputWrapperClassName) => {
  if(inputWrapperClassName){
    return inputWrapperClassName;
  }
  const urlParts = window.location.href.split("/");
  return urlParts.pop();
}

const SinglePageTemplateComponent = ({
  onInit,
  wrapperClassName,
  children,
  h1LabelKey,
  t
}) => {
  useEffect(() => {
    onInit && onInit();
  }, []);
  return (
    <div className={"single-page-template " + getWrapperClassName(wrapperClassName)}>
      {h1LabelKey && <h1 className="h1-txt">{t(h1LabelKey)}</h1>}
      <div>{children}</div>
    </div>
  );
};

SinglePageTemplateComponent.defaultProps = {
  wrapperClassName: "",
  h1LabelKey: ""
};

export const SinglePageTemplate = withNamespaces()(SinglePageTemplateComponent);
