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

  input, select, textarea {
    background: #1b1c1c !important;
  }

  textarea, select, input, button { 
    outline: none; 
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus input:-webkit-autofill,
  input:-webkit-text-fill-color,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: inherit !important;
    -webkit-box-shadow: 0 0 0px 1000px #1b1c1c inset !important;
    transition: background-color 5000s ease-in-out 0s !important;
    color: #f7f7f7 !important;
  }

  @-webkit-keyframes autofill {
      to {
          color: #fff;
          background: transparent;
      }
  }

  select:-webkit-autofill,
  input:-webkit-autofill {
      -webkit-animation-name: autofill;
      -webkit-animation-fill-mode: both;
  }

`;