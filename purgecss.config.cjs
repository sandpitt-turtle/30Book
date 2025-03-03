module.exports = {
  content: ["src/**/*.{js,jsx,html}"], 
  css: ["src/**/*.css"], // Target compiled CSS, not SCSS
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
};
