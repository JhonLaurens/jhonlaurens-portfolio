module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Error Prevention
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'no-unreachable': 'error',
    
    // Code Quality
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': 'error',
    'curly': 'error',
    
    // Style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    
    // Best Practices
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // Modern JavaScript
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error'
  },
  globals: {
    // Global variables
    'AOS': 'readonly',
    'Typed': 'readonly',
    'GLightbox': 'readonly',
    'Swiper': 'readonly',
    'Isotope': 'readonly',
    'PureCounter': 'readonly',
    'Waypoint': 'readonly',
    'bootstrap': 'readonly'
  }
};