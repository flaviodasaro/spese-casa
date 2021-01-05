import { withNamespaces } from "react-i18next";
import { Quote } from "../../../common/components/quote/Quote";
import "./QuoteSection.scss";

export const QuoteSection = withNamespaces()(
  ({
    t,
    children,
    quoteI18nKey,
    paragraphMainKey,
    paragraphValue1,
    paragraphMinorKey,
    paragraphValue2,
    paragraphFinalKey,
    show
  }) => {
    if (!show) {
      return <></>;
    }
    return (
      <section className="section-wrapper">
        <Quote i18nKey={t(quoteI18nKey)} />
        <p>
          <span>{t(paragraphMainKey)}</span>
          <span className="additional-content">{paragraphValue1}</span>
          <span>{t(paragraphMinorKey)}</span>
          <span className="additional-content">{paragraphValue2}</span>
          <span>{t(paragraphFinalKey)}</span>
        </p>
        {children}
      </section>
    );
  }
);
