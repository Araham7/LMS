# 1. `eslint-plugin-simple-import-sort` : (Ek jayse import ko sajata hai bas.)
##  we use `eslint-plugin-simple-import-sort` to `automatically sort the import statements` in our code. Its main purpose is to keep the code `clean`, `readable`, and `consistent`, making it easier for developers to manage imports and maintain a structured format across the project.

### i. Intallation of `eslint-plugin-simple-import-sort`
```bash
npm i eslint-plugin-simple-import-sort
```

### ii. Add ```import simpleImportSort from 'eslint-plugin-simple-import-sort' // Import simple-import-sort``` in `eslint.config.js`(file's)

### iii. Add `simple-import-sort` in `eslint.config.js`(file's) `plugins`(Object) section.

### iv. Add ``` 'simple-import-sort/imports': 'error', //Adding simple-import-sort rule ``` in `eslint.config.js`(file's) `rules`(Object) section. 

```js

import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort' // Import simple-import-sort

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort, // Adding "simpleImportSort" in "plugins" section.
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'simple-import-sort/imports': 'error', // Adding simple-import-sort rule.
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

```

## v. install the extension `ESLint` , then `Restart` the vsCode editor.

## vi. (`To enable auto import sort on file save in vs-code(vs-codium)`) Configuring VS-code to fix all eslint-error on save :---
(Go to settings>(surch `settings`) then enter on the `Edit in settings.json`)
and add this ` , "editor.codeActionsOnSave": { "source.fixAll.eslint": "always" } `
```js
{
    "files.autoSave": "afterDelay",
    "editor.wordWrap": "on",
    "git.openRepositoryInParentFolders": "always",
    "workbench.colorTheme": "Dracula Theme",
    "package-manager-enhancer.enablePackageJsonDependenciesCodeLens": true,
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.mouseWheelZoom": true,
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "workbench.iconTheme": "material-icon-theme",
    "workbench.settings.applyToAllProfiles": [




    ],
    "editor.codeActionsOnSave": { // Add this here.
        "source.fixAll.eslint": "always"
    }
}
```

# 2. `react-hot-toast`: 
## `react-hot-toast` is a lightweight, customizable library for creating beautiful and accessible toast notifications in React applications. It's easy to integrate and provides a smooth user experience with animated notifications.

### i. Installation :
```bash
npm install react-hot-toast
```
### ii. Go to the `main.jsx` file and add the `<Toaster />` component to enable `react-hot-toast` in the entire app :

```jsx
// CSS import
import './index.css';

// Component import
import App from './App.jsx';

// Library import
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster />  {/* This way we can enable the `react-hot-toast` throughout the entire app */}
  </BrowserRouter>
);
```

# 3. creating `axiosInstance` : 
## create a directory `./src/Helpers/axiosInstance.js`
Add code :---
```js
import "dotenv/config"; // importing the `dotenv`(environment-variable-data).
import axios from "axios"; // importing the `axios`.

const BASE_URL = process.env.BASE_URL; // getting the `BASE_URL` from `dotenv`.

const axiosInstance = axios.create(); // Creating an instance of axios.
axiosInstance.defaults.baseURL = BASE_URL; // Setting the `BASE_URL` of axios.
axiosInstance.defaults.withCredentials = true; // Enabling credentials.
axiosInstance.defaults.timeout = 30000; // Setting timeout to 30 seconds (30000 ms).


export default axiosInstance; // Exporting axios instance.
```

# 4. How to remove "eslint missing props validation" error ?

##  To remove the "ESLint missing props validation" error , we use :---

### i. Go to the `eslint.config.js` file and add `"react/prop-types": "off"` in `"rules":{  }` section :---
```js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort' // Import simple-import-sort

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort, // "simpleImportSort" in "plugins" section.
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'simple-import-sort/imports': 'error', // Adding simple-import-sort rule.
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react/prop-types": "off", // To remove the "ESLint missing props validation" error.
    },
  },
]
```

# 5. Enabling DaisyUI by Adding `daisyui` in the `plugins Array` of `tailwind.config.js` file :---

```js
/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'; // Import this

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // & Add the DaisyUI plugin here
  ],
};

```