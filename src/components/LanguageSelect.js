import React, { useContext } from "react";

import { I18nContext } from "../i18n";

const LanguageSelect = props => {
  const { setLanguage  } = useContext(I18nContext);
   
  const renderOption = code => (
    <option value={code}>
      {code}
    </option>
  );

  return (
    <select onChange={(e) => setLanguage(e.target.value)}>
      {renderOption("en")}
      {renderOption("tr")}
      {renderOption("es")}
    </select>
  );
};

export default LanguageSelect;
