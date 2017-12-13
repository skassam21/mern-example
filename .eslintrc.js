module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "import"
  ],
  "settings": {
    "import/resolver": {
        "webpack": "webpack.config.js"
    }
  },
  "env": {
    "browser": true,
    "jquery": true,
    "node": true
  },
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
};
