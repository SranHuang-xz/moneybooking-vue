module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-undef': 'off',
    "@typescript-eslint/explicit-module-boundary-types": "off",
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      // enable the rule specifically for TypeScript files

      "files": ["*.js", "*.ts"],

      "rules": {
        "@typescript-eslint/explicit-module-boundary-types": "warn"

      }
    }
  ]
}
