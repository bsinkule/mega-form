import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
  html, body {
    margin: 0;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    font-family: "Courier New", Courier, monospace;
    background-color: #1b1c1c;
    box-sizing: border-box;
  }

  textarea, select, input, button { 
    outline: none; 
  }

`;