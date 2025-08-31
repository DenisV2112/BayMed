import { translations } from "./translations.js";

export function changeLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });

  localStorage.setItem("lang", lang);
}

export function initLanguage() {
  const savedLang = localStorage.getItem("lang") || "en";
  changeLanguage(savedLang);

  const switcher = document.getElementById("lang-switcher");
  if (switcher) {
    switcher.value = savedLang;
    switcher.addEventListener("change", (e) => {
      changeLanguage(e.target.value);
    });
  }
}
