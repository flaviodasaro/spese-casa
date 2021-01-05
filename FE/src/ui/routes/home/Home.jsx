import { withChangeIconOnInit } from "../../common/hocs/withChangeIconOnInit";
import { HOME_KEY } from "../../common/constants";
import { SinglePageTemplate } from "../../layout/content/single-page-template/SinglePageTemplate";
import { QuoteSection } from "./quote-section/QuoteSection";

const HomeComponent = ({ dataForHome, init }) => {
  const {
    nameUtenteMore,
    valueUtenteMore,
    nameGruppoMore,
    valueGruppoMore,
    nameUtenteBigPay,
    valueUtenteBigPay
  } = dataForHome;

  return (
    <SinglePageTemplate onInit={init} h1LabelKey="HOME.TITLE">
      <div>
        <QuoteSection
          show={!!nameUtenteMore}
          quoteI18nKey="HOME.QUOTE_1"
          paragraphMainKey="HOME.SUB_QUOTE_1"
          paragraphMinorKey="HOME.SUB_QUOTE_ADDITIONAL_1"
          paragraphFinalKey="HOME.SUB_QUOTE_ENDING_COMMON"
          paragraphValue1={nameUtenteMore}
          paragraphValue2={valueUtenteMore}
        />
        <QuoteSection
          show={!!nameGruppoMore}
          quoteI18nKey="HOME.QUOTE_2"
          paragraphMainKey="HOME.SUB_QUOTE_2"
          paragraphMinorKey="HOME.SUB_QUOTE_ADDITIONAL_2"
          paragraphFinalKey="HOME.SUB_QUOTE_ENDING_COMMON"
          paragraphValue1={nameGruppoMore}
          paragraphValue2={valueGruppoMore}
        />
        <QuoteSection
          show={!!nameUtenteBigPay}
          quoteI18nKey="HOME.QUOTE_3"
          paragraphMainKey="HOME.SUB_QUOTE_3"
          paragraphMinorKey="HOME.SUB_QUOTE_ADDITIONAL_3"
          //paragraphFinalKey="HOME.SUB_QUOTE_ENDING_COMMON"
          paragraphValue1={nameUtenteBigPay}
          paragraphValue2={`${valueUtenteBigPay}€`}
        />
      </div>
    </SinglePageTemplate>
  );
};

export const Home = withChangeIconOnInit(HOME_KEY)(HomeComponent);
