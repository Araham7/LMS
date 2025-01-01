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

# 6. To use "chart.js" :
```bash
npm i react-chartjs-2 chart.js # This will install "chart.js" and "react-chartjs-2".
```

# 7. How to host react-website using `gh-pages`(i.e, using `Github Pages`) :---

## 1. Install `gh-pages` Package :
```bash
npm install gh-pages --save-dev
```

## 2. Update `package.json` file :
### Add a homepage field in your package.json. Replace `<git-username>` with your GitHub username and `<git-repository-name>` with your git repository name:
```js
"homepage": "https://<git-username>.github.io/<git-repository-name>"
```
### Then, update the `scripts` section(of `package.json` file) to include deployment commands:
```js
"scripts": {
  "predeploy": "vite build",
  "deploy": "gh-pages -d dist"
}
```
#### Finally we have to add below code in `package.json` file:
```js
"homepage": "https://<git-username>.github.io/<git-repository-name>",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "predeploy": "vite build",
  "deploy": "gh-pages -d dist"
}
```

## 3. Configure Vite:

Modify your `vite.config.js` or `vite.config.ts` file to specify the `base` option. The `base` option should match your repository name:

```js
base: '/<git-repository-name>',
```

### Finally your `vite.cofig.js` file look like this :---
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/<git-repository-name>', // Replace '<git-repository-name>' with your repository name.
});
```

## 4. Fix React Router (If Used):
If you're using React Router, update your `BrowserRouter` to use a `basename` that matches your `base` path:
```js
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter basename="/<git-repository-name>">
    {/* Your Routes Here */}
  </BrowserRouter>
);

export default App;
```

## 5. Why Add a `404.html`?
GitHub Pages serves the 404.html file whenever a route isn't directly found. This is essential for Single Page Applications (SPA), like React apps, because React handles routing on the client side.(To overcome this problem we always use)

## 6. Create a `404.html` File:
Inside the `public` directory(folder) of your project, create a file named `404.html` . This ensures it gets copied into the `dist` folder during the build process.

### Add the following code to the `404.html` file:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 Not Found</title>
  </head>
  <body>
    <script>
      // Redirect all 404 requests to the index.html
      window.location.href = '/<git-repository-name>/' + location.pathname + location.search + location.hash;
    </script>
  </body>
</html>
```
> Note: Replace /<git-repository-name>/ with the `base` path of your application as configured in `vite.config.js`.

## 7. `Build` the application:
`npm run build` command ko run karne se project ke production-ready files generate hote hain. Ye files optimize ki jaati hain aur ready hoti hain deploy karne ke liye.
```bash
npm run build
```

## 8. Deploy to `GitHub Pages`:
`npm run deploy` command project ko deploy karne ke liye use hota hai.Ye hosting platform par files upload karta hai, jaise GitHub Pages, Vercel, ya Netlify.

```bash
npm run deploy
```

## 9. Test Locally:
Run the application locally using the `preview` script to ensure it works as expected:
```bash
npm run preview # This command run the build file locally.
```