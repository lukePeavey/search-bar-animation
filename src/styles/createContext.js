/* eslint-disable flowtype/require-valid-file-annotation */

import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme } from 'material-ui/styles';
import { lightBlue, pink } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink,
    text: {
      secondary: "rgba(0, 0, 0, 0.45)"
    }
  },
  typography: {
    headline: {
      fontSize: '1.2rem',
      fontWeight: 400,
    }
  }
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export const sheetsManager = new Map();

export default function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}
