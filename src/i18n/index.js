import React, { useReducer } from "react";
import axios from "axios";
import EN from "./en.json";
import TR from "./tr.json";
// Loading spanish dynamically
// import ES from "./es.json";

const translations = {
  en: EN,
  tr: TR,
  // es: populated from endpoint
};

const getTranslate = (langCode) => (key) => translations[langCode][key] || key;

const getLangauge = async (langCode, dispatch) => {
  if (typeof dispatch === "function"){
    const { data } = await axios.request(config);
    translations[langCode] = data;
    dispatch({ type: "setLanguage", payload: langCode });
  }
};

const initialState = {
  langCode: "en",
  translate: getTranslate("en"),
  loading: false
};

const config = {
  method: "GET",
  url: "https://api.mocki.io/v2/76e1e299" // would be in practice /:language on your backend api (to get new endpoint: https://mocki.io/fake-json-api)
};



export const I18nContext = React.createContext(initialState);
// Another option would be to use this method of providing a setter function to the context (less of a store pattern):
// https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
export const I18nContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "setLanguage":
        // check if we have the translations file existing in our current state
        if (translations[action.payload]) {
        return {
          langCode: action.payload,
          translate: getTranslate(action.payload),
          loading: false
        };
      } else {
        // if we do not then retrieve from server
        getLangauge(action.payload, dispatch)
        return {
          langCode: action.payload,
          translate: null,
          loading: true
        };
      }
      default:
        return { ...initialState };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <I18nContext.Provider value={{ ...state, dispatch }}>
      {children}
    </I18nContext.Provider>
  );
};
