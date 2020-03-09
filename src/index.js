import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider } from 'styled-components';

import Store from '~/state/Store';
import GlobalStyle from '~/style/GlobalStyle';
import defaultTheme from '~/style/themes/default';
import App from '~/containers/App';

ReactDOM.render(
  <StoreProvider store={Store}>
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <GlobalStyle />
        <App />
      </Router>
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
);
