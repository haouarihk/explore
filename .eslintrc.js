module.exports = {
    root: true,
    extends: ["next/core-web-vitals","plugin:tailwindcss/recommended"],
    overrides: [
        {
          files: ['*.ts', '*.tsx', '*.js'],
          parser: '@typescript-eslint/parser',
        },
      ],
  };