// postcss.config.js
module.exports = {
  plugins: {
    // --- IMPORTANT CHANGE HERE ---
    '@tailwindcss/postcss': {}, // This is the correct way for Tailwind CSS v4
    // --- END IMPORTANT CHANGE ---
    autoprefixer: {}, // Keep autoprefixer for now, although Tailwind v4 can handle some of this
  },
};