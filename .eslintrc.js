module.exports = {
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": [
    "plugin:cypress/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "script"
  },
  "rules": {
    "space-before-function-paren": 0,
    "semi": [2, "always"]
  }
};
