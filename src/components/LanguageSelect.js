import React, { useContext } from "react";

import { I18nContext } from "../i18n";

const LanguageSelect = props => {
  const { dispatch } = useContext(I18nContext);

  const onLanguageSelect = e => {
    dispatch({ type: "setLanguage", payload: e.target.value })
  }
   

  const renderOption = code => (
    <option value={code}>
      {code}
    </option>
  );

  return (
    <select onChange={onLanguageSelect}>
      {renderOption("en")}
      {renderOption("tr")}
      {renderOption("es")}
    </select>
  );
};

export default LanguageSelect;
