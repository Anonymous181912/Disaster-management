// Object to hold all language data
let languageContent = {};

// Function to fetch a language file
async function fetchLanguage(lang) {
  if (!languageContent[lang]) {
    try {
      // Use a relative path to ensure it works from any HTML file
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Could not load ${lang}.json`);
      }
      languageContent[lang] = await response.json();
    } catch (error) {
      console.error(error);
      // Fallback to English if the language file is not found
      if (lang !== 'en' && !languageContent['en']) {
        await fetchLanguage('en');
      }
      return languageContent['en'];
    }
  }
  return languageContent[lang];
}

// Function to apply translations based on the selected language
const applyTranslations = async (lang) => {
  const langData = await fetchLanguage(lang);
  if (!langData) return;

  document.querySelectorAll("[data-translate-key]").forEach((element) => {
    const key = element.getAttribute("data-translate-key");
    if (langData[key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = langData[key];
        } else {
            element.innerHTML = langData[key];
        }
    }
  });

  // Special handling for the page title
  const titleKey = document.querySelector('title')?.getAttribute('data-translate-key');
  if (titleKey && langData[titleKey]) {
      document.title = langData[titleKey];
  }
};

// Function to change language, saved preference, and apply translations
const changeLanguage = () => {
  const selectedLang = document.getElementById("lang-switch").value;
  localStorage.setItem("selectedLanguage", selectedLang); // Save preference
  applyTranslations(selectedLang);
};

// Apply translations on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  const langSelector = document.getElementById("lang-switch");
  
  if (langSelector) {
    langSelector.value = savedLang;
  }
  
  applyTranslations(savedLang);
});


document.addEventListener('DOMContentLoaded', () =>
  document.getElementById('lang-switch')?.addEventListener('change', changeLanguage)
);