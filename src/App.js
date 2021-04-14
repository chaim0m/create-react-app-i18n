import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";

import { I18nContext } from "./i18n";
import LanguageSelect from "./components/LanguageSelect";

const App = () => {
  const { translate, loading } = useContext(I18nContext);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LanguageSelect />
        {!loading ? (
          <>
            <p>{translate("edit_and_save")}</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translate("learn_react")}
            </a>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
};

export default App;
