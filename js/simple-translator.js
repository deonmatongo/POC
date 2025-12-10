/**
 * Simple Translator - Lightweight translation library
 * Optimized for smooth language switching without flickering
 */
class SimpleTranslator {
  constructor(options = {}) {
    this.defaultLanguage = options.defaultLanguage || 'en';
    this.currentLanguage = this.defaultLanguage;
    this.translations = {};
    this.filesLocation = options.filesLocation || '/i18n';
    this.persist = options.persist !== false;
    this.persistKey = options.persistKey || 'preferred_language';
    this.preloadedLanguages = new Set();
    this.isTranslating = false;
    this.pendingElements = {
      i18n: [],
      i18nHtml: [],
      i18nPlaceholder: [],
      i18nTitle: []
    };
    
    // Load saved language preference
    if (this.persist) {
      const savedLang = localStorage.getItem(this.persistKey);
      if (savedLang) {
        this.currentLanguage = savedLang;
      }
    }
  }

  async load(language) {
    // Return immediately if already loaded
    if (this.translations[language]) {
      this.currentLanguage = language;
      if (this.persist) {
        localStorage.setItem(this.persistKey, language);
      }
      return this.translations[language];
    }

    try {
      const response = await fetch(`${this.filesLocation}/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translation file for ${language}`);
      }
      this.translations[language] = await response.json();
      this.currentLanguage = language;
      this.preloadedLanguages.add(language);
      
      if (this.persist) {
        localStorage.setItem(this.persistKey, language);
      }
      
      return this.translations[language];
    } catch (error) {
      console.error('Translation load error:', error);
      // Fallback to default language
      if (language !== this.defaultLanguage) {
        return this.load(this.defaultLanguage);
      }
      return {};
    }
  }

  /**
   * Preload all available languages to prevent flickering
   */
  async preloadAll(languages = ['en', 'fr']) {
    const preloadPromises = languages.map(lang => {
      if (!this.translations[lang]) {
        return this.load(lang).catch(err => {
          console.warn(`Failed to preload language ${lang}:`, err);
          return null;
        });
      }
      return Promise.resolve(this.translations[lang]);
    });
    
    await Promise.all(preloadPromises);
    return this.translations;
  }

  translate(key, language = null, params = {}) {
    const keys = key.split('.');
    const lang = language || this.currentLanguage;
    let value = this.translations[lang];
    
    if (!value) {
      return key;
    }
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    // Simple parameter replacement - support both {{param}} and {param}
    Object.keys(params).forEach(param => {
      value = value.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      value = value.replace(new RegExp(`{${param}}`, 'g'), params[param]);
    });
    
    return value || key;
  }

  /**
   * Batch DOM updates to prevent flickering and multiple reflows
   */
  translatePageTo(language) {
    // Prevent concurrent translations
    if (this.isTranslating) {
      return Promise.resolve(this.translations[language] || {});
    }

    this.isTranslating = true;

    return this.load(language).then(() => {
      // Use requestAnimationFrame to batch all DOM updates
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          // Cache all elements to update (single DOM query per type)
          const elementsToUpdate = {
            i18n: Array.from(document.querySelectorAll('[data-i18n]')),
            i18nHtml: Array.from(document.querySelectorAll('[data-i18n-html]')),
            i18nPlaceholder: Array.from(document.querySelectorAll('[data-i18n-placeholder]')),
            i18nTitle: Array.from(document.querySelectorAll('[data-i18n-title]'))
          };

          // Batch update all elements
          // Update data-i18n elements
          elementsToUpdate.i18n.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            // Check if translation contains HTML
            if (translation.includes('<br>') || translation.includes('<span>')) {
              element.innerHTML = translation;
            } else {
              element.textContent = translation;
            }
          });
          
          // Update data-i18n-html elements
          elementsToUpdate.i18nHtml.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = this.translate(key);
          });
          
          // Update placeholders
          elementsToUpdate.i18nPlaceholder.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.translate(key);
          });
          
          // Update title attributes
          elementsToUpdate.i18nTitle.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.translate(key);
          });
          
          // Update document language (single update)
          document.documentElement.lang = language;
          
          this.isTranslating = false;
          resolve(this.translations[language]);
        });
      });
    }).catch(error => {
      this.isTranslating = false;
      console.error('Translation error:', error);
      return this.translations[language] || {};
    });
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

