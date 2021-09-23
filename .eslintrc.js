module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // 配置js全局变量，因为是uni-app，全局的uni是不需要引入的，还有5+的plus对象
  globals: {
    uni: 'readonly',
    plus: 'readonly',
    wx: 'readonly',
  },
  extends: [
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    '@vue/typescript',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },
}
