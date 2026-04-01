import { GlobalStyles } from "./GlobalStyles";
import Router from "./router";
import { normalizeTheme } from "./theme/themes";
import { applyDocumentBranding } from "./theme/branding";

function App() {
  const themeId = normalizeTheme(process.env.REACT_APP_THEME);
  document.documentElement.dataset.theme = themeId;
  applyDocumentBranding(themeId);

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
