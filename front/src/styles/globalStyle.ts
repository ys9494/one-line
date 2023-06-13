import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  body {
  	line-height: 1;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }

  html,
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 0;
    line-height:1.5;
    border-radius: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a,
  button {
    cursor: pointer;
    color: #000;
  }

  input,
  select,
  textarea {
    background-color: transparent;
  }

  input, textarea {
    user-select: auto;
  }

  input:focus, textarea:focus {
    outline: none;
  }

  button {
    padding: 0;
    cursor: pointer;
  }

  .tox-notification, .tox-statusbar {
    display: none !important;
  }
`;
