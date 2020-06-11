import { createGlobalStyle } from 'styled-components';
// import { WithTheme } from '@material-ui/core/styles';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => { console.log(theme); return theme.body}};
    color: ${({ theme }) => theme.text};
  }
`

// export default withTheme(GlobalStyles);