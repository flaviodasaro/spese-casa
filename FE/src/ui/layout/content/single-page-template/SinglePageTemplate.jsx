import { withNamespaces } from "react-i18next";
import "./SinglePageTemplate.scss";

const SinglePageTemplateComponent = ({ children, h1LabelKey, t }) => {
  return (
    <div className="single-page-template">
      {h1LabelKey && <h1 className="h1-txt">{t(h1LabelKey)}</h1>}
      <div>{children}</div>
    </div>
  );
};

export const SinglePageTemplate = withNamespaces()(SinglePageTemplateComponent);