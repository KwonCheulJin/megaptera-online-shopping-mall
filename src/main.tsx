/* eslint-disable import/no-unresolved,import/no-extraneous-dependencies */

import 'reflect-metadata';

import React from 'react';

import ReactDOM from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { Reset } from 'styled-reset';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routes from './routes';

import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/GlobalStyle';

const router = createBrowserRouter(routes);

function main() {
  Reflect.get(window, 'IMP').init(process.env.PORTONE_IMP);

  const container = document.getElementById('root');
  if (!container) {
    return;
  }

  const root = ReactDOM.createRoot(container);
  root.render((
    <React.StrictMode>
      <ThemeProvider theme={defaultTheme}>
        <Reset />
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  ));
}

main();
