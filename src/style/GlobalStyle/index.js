import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

import 'rsuite/dist/styles/rsuite-default.css';
import './global.css';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
