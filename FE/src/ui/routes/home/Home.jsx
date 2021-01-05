import { withChangeIconOnInit } from "../../common/hocs/withChangeIconOnInit";
import { HOME_KEY } from "../../common/constants";
import { SinglePageTemplate } from "../../layout/content/single-page-template/SinglePageTemplate";
import { QuoteSection } from "./quote-section/QuoteSection";
import "./Home.scss";

const HomeComponent = ({
  usernameUtentePagatoPiuVolte,
  nameGruppoPartecipatoPiuVolte,
  nameUtenteBigPay,
  init
}) => {
  return (
    <SinglePageTemplate onInit={init} h1LabelKey="HOME.TITLE">
      <div className="home-wrapper">
        <QuoteSection
          quoteI18nKey="HOME.QUOTE_1"
          paragraphKey="HOME.SUB_QUOTE_1"
          show={!!usernameUtentePagatoPiuVolte}
          paragraphAdditionalContent={usernameUtentePagatoPiuVolte}
        />
        <QuoteSection
          quoteI18nKey="HOME.QUOTE_2"
          paragraphKey="HOME.SUB_QUOTE_2"
          show={!!nameGruppoPartecipatoPiuVolte}
          paragraphAdditionalContent={nameGruppoPartecipatoPiuVolte}
        />
        <QuoteSection
          quoteI18nKey="HOME.QUOTE_3"
          paragraphKey="HOME.SUB_QUOTE_3"
          show={!!nameUtenteBigPay}
          paragraphAdditionalContent={nameUtenteBigPay}
        />
      </div>
    </SinglePageTemplate>
  );
};

export const Home = withChangeIconOnInit(HOME_KEY)(HomeComponent);
