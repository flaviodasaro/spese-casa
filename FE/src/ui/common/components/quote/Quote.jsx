import { withNamespaces } from "react-i18next";
import "./Quote.scss";

export const Quote = withNamespaces()(({ rawText, i18nKey, t }) => {
  const text = i18nKey ? t(i18nKey) : rawText;
  return <p className="quote">{`“${text}”`}</p>;
});

Quote.defaultProps = {
  rawText: ""
};
