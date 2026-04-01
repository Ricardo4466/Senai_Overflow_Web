import logoSenai from "../assets/logo.png";
import logoPartner from "../assets/logo-partner.svg";
import loginBgSenai from "../assets/bg.jpg";
import loginBgPartner from "../assets/login-bg-partner.png";
import { normalizeTheme } from "./themes";

const BASE_URL = process.env.PUBLIC_URL || "";

/**
 * @typedef {{
 *   documentTitle: string,
 *   metaDescription: string,
 *   themeColor: string,
 *   logo: string,
 *   logoAlt: string,
 *   faviconUrl: string,
 *   appleTouchIconUrl: string,
 *   loginBackground: string,
 *   loginHeroTitle: string,
 *   loginHeroSubtitle: string,
 *   registerHeroSubtitle: string,
 * }} Branding
 */

/** @type {Record<import('./themes').ThemeId, Branding>} */
const BRANDING = {
  senai: {
    documentTitle: "Senai Overflow",
    metaDescription:
      "Senai Overflow — perguntas e respostas da comunidade.",
    themeColor: "#12131a",
    logo: logoSenai,
    logoAlt: "Senai Overflow",
    faviconUrl: `${BASE_URL}/favicon.ico`,
    appleTouchIconUrl: `${BASE_URL}/logo192.png`,
    loginBackground: loginBgSenai,
    loginHeroTitle: "BEM VINDO AO SENAI OVERFLOW!",
    loginHeroSubtitle: "O SEU PORTAL DE RESPOSTAS",
    registerHeroSubtitle: "INFORME SEUS DADOS",
  },
  partner: {
    documentTitle: "DevOverflow",
    metaDescription:
      "DevOverflow — dúvidas de código, stack e revisão com a comunidade dev.",
    themeColor: "#0d1117",
    logo: logoPartner,
    logoAlt: "DevOverflow",
    faviconUrl: `${BASE_URL}/favicon-partner.svg`,
    appleTouchIconUrl: `${BASE_URL}/favicon-partner.svg`,
    loginBackground: loginBgPartner,
    loginHeroTitle: "BEM-VINDO AO DEV OVERFLOW",
    loginHeroSubtitle:
      "DÚVIDAS DE CÓDIGO, STACK E BOAS PRÁTICAS — POR DEVS, PARA DEVS",
    registerHeroSubtitle: "CONFIGURE SUA CONTA DE DESENVOLVEDOR(A)",
  },
};

/** @returns {import('./themes').ThemeId} */
export function getActiveThemeId() {
  return normalizeTheme(process.env.REACT_APP_THEME);
}

/** @returns {Branding} */
export function getActiveBranding() {
  return BRANDING[getActiveThemeId()];
}

/** @param {import('./themes').ThemeId} themeId */
export function getBranding(themeId) {
  return BRANDING[themeId] ?? BRANDING.senai;
}

/** @param {import('./themes').ThemeId} themeId */
export function applyDocumentBranding(themeId) {
  const b = getBranding(themeId);
  document.title = b.documentTitle;

  const ensureLink = (rel) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    return el;
  };

  const icon = ensureLink("icon");
  icon.setAttribute("href", b.faviconUrl);

  const apple = ensureLink("apple-touch-icon");
  apple.setAttribute("href", b.appleTouchIconUrl);

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", b.metaDescription);
  }

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", b.themeColor);
  }
}
