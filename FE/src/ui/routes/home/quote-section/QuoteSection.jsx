import { withNamespaces } from "react-i18next";
import { Quote } from "../../../common/components/quote/Quote";
import "./QuoteSection.scss";

export const QuoteSection = withNamespaces()(
  ({
    t,
    children,
    quoteI18nKey,
    paragraphKey,
    paragraphAdditionalContent,
    show
  }) => {
    if (!show) {
      return <></>;
    }
    return (
      <section className="section-wrapper">
        <Quote i18nKey={t(quoteI18nKey)} />
        <p>
          {t(paragraphKey)}
          <span className="additional-content">
            {paragraphAdditionalContent}
          </span>
        </p>
        {children}
      </section>
    );
  }
);
