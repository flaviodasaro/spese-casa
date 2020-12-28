import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationIT from './locales/it-IT.json';

// the translations
const resources = {
  it: {
    translation: translationIT
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "it",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;