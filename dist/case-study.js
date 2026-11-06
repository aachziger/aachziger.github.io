// Shared behaviour for the app case-study pages. Each page sets
// window.CS_T = { en: {...}, de: {...} } with its own strings before
// loading this file; the strings below are the ones every page uses.
// Theme and language share index.html's stored choices, so the visitor's
// settings carry over between pages.
(function() {
    var COMMON = {
        en: {
            'cs.back':'← ALL APPS',
            'cs.f.launched':'LAUNCHED', 'cs.f.platform':'PLATFORM', 'cs.f.platforms':'PLATFORMS',
            'cs.f.langs':'LANGUAGES', 'cs.f.price':'PRICE', 'cs.f.version':'LATEST VERSION',
            'cs.free':'Free',
            'cs.fig':'FIG. 1 · GAMEPLAY',
            'cs.shots.eyebrow':'02 · SCREENSHOTS', 'cs.shots.title':'From the <span class="accent">App Store</span>',
            'cs.shots.hint':'SCROLL →',
            'cs.prev':'← PREVIOUS', 'cs.next':'NEXT →', 'cs.allapps':'ALL APPS',
            'cs.copy':'© 2026 Andrei Achziger · Some rights reserved'
        },
        de: {
            'cs.back':'← ALLE APPS',
            'cs.f.launched':'ERSCHIENEN', 'cs.f.platform':'PLATTFORM', 'cs.f.platforms':'PLATTFORMEN',
            'cs.f.langs':'SPRACHEN', 'cs.f.price':'PREIS', 'cs.f.version':'AKTUELLE VERSION',
            'cs.free':'Kostenlos',
            'cs.fig':'ABB. 1 · GAMEPLAY',
            'cs.shots.eyebrow':'02 · SCREENSHOTS', 'cs.shots.title':'Aus dem <span class="accent">App Store</span>',
            'cs.shots.hint':'SCROLLEN →',
            'cs.prev':'← ZURÜCK', 'cs.next':'WEITER →', 'cs.allapps':'ALLE APPS',
            'cs.copy':'© 2026 Andrei Achziger · Alle Rechte vorbehalten'
        }
    };
    var PAGE = window.CS_T || { en: {}, de: {} };

    function strings(lang) {
        var out = {}, k;
        var c = COMMON[lang] || COMMON.en, p = PAGE[lang] || PAGE.en || {};
        for (k in c) out[k] = c[k];
        for (k in p) out[k] = p[k];
        return out;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById('theme-btn').textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    function applyLang(lang) {
        var t = strings(lang);
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var v = t[el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
            var v = t[el.dataset.i18nHtml];
            if (v !== undefined) el.innerHTML = v;
        });
        document.documentElement.lang = lang;
        document.getElementById('lang-btn').textContent = lang === 'de' ? '🇺🇸' : '🇩🇪';
    }

    applyTheme(localStorage.getItem('aach_theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
    applyLang(localStorage.getItem('aach_lang') ||
        ((navigator.language || '').toLowerCase().startsWith('de') ? 'de' : 'en'));

    document.getElementById('theme-btn').addEventListener('click', function() {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('aach_theme', next);
        applyTheme(next);
    });
    document.getElementById('lang-btn').addEventListener('click', function() {
        var next = document.documentElement.lang === 'de' ? 'en' : 'de';
        localStorage.setItem('aach_lang', next);
        applyLang(next);
    });

    // Reduced motion keeps the poster instead of the looping gameplay.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.stage video').forEach(function(v) {
            v.removeAttribute('autoplay');
            v.pause();
        });
    }
})();
