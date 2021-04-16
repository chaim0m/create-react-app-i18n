import React  from "react";
import axios from "axios";
import EN from "./en.json";
import TR from "./tr.json";
// Loading spanish dynamically
// import ES from "./es.json";
// STORE
const translations = {
  en: EN,
  tr: TR,
  // es: populated from endpoint
};

const getTranslate = (langCode) => (key) => translations[langCode][key] || key;

const initialState = {
  translate: getTranslate("en"),
  loading: false
};

const config = {
  method: "GET",
  url: "https://api.mocki.io/v2/76e1e299" // would be in practice /:language on your backend api (to get new endpoint: https://mocki.io/fake-json-api)
};



export const I18nContext = React.createContext(initialState);

export const I18nContextProvider = ({ children }) => {
  const [language, setLanguage] = React.useState("en")
  const [state, setState] = React.useState(initialState)
  const getLangauge = React.useCallback(
    async(langCode) => {
      // add language to config URL
      const { data } = await axios.request(config);
      translations[langCode] = data;
      setState({ 
        translate: getTranslate(langCode),
        loading: false
      })
  }, [])
  React.useEffect(() => {
    if (translations[language]){
      setState({ 
        translate: getTranslate(language),
        loading: false
      })
    } else {
      getLangauge(language)
      setState({
          translate: null,
          loading: true
        })
    }
  }, [language])
  return (
    <I18nContext.Provider value={{ state, language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
