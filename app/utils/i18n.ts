type LocaleData = Record<string, string>;

const defaultLanguage = "en-US";
const supportedLanguages = [
  "en-US", // Inglês - Estados Unidos
  "en-GB", // Inglês - Reino Unido
  "en-CA", // Inglês - Canadá
  "en-AU", // Inglês - Austrália
  "en-IN", // Inglês - Índia
  "es-ES", // Espanhol - Espanha
  "es-MX", // Espanhol - México
  "es-AR", // Espanhol - Argentina
  "es-CO", // Espanhol - Colômbia
  "es-CL", // Espanhol - Chile
  "pt-BR", // Português - Brasil
  "pt-PT", // Português - Portugal
  "pt-AO", // Português - Angola
  "pt-MZ", // Português - Moçambique
  "pt-CV"  // Português - Cabo Verde
];

let translations: LocaleData = {};
let isLoaded = false;

export function getLocale(): string {
  if (typeof window !== "undefined" && window.navigator) {
    const languages = navigator.languages;

    const fullMatch = languages.find(lang => supportedLanguages.includes(lang));
    if (fullMatch) return fullMatch;

    const baseMatch = languages.map(lang => lang.split("-")[0]).find(lang => lang === "pt");
    if (baseMatch) return "pt-BR";

    return defaultLanguage;
  }
  return defaultLanguage;
}

export async function loadLocale(locale: string = getLocale()): Promise<void> {
  try {
    const response = await fetch(`/locales/${locale}.json`);
    if (!response.ok) throw new Error(`Erro ao carregar ${locale}.json`);

    translations = await response.json();
    isLoaded = true;
    document.dispatchEvent(new Event("languageChanged"));
  } catch (error) {
    translations = {};
    isLoaded = true;
  }
}

export function t(key: string, locale: string = getLocale(), params?: Record<string, string>): string {
  if (!isLoaded) return key;
  let text = translations[key] || key;
  if (params) {
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
  }
  return text;
}

if (typeof window !== "undefined") {
  loadLocale();
}
