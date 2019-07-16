import React from "react";
import styled from "styled-components";

const Loader = ({ size }) => {
  return (
    <Main size={size}>
      <div className="bounce1 spinner"></div>
      <div className="bounce2 spinner"></div>
      <div className="bounce3 spinner"></div>
    </Main>
  )
}
export default Loader;

const Main = styled.div`
    margin: auto;
    width: 70px;
    text-align: center;

  .spinner {
    width: ${props => props.size};
    height: ${props => props.size};
    background-color: #333;
    margin: 0px 3px;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.6s infinite ease-in-out both;
    animation: sk-bouncedelay 1.6s infinite ease-in-out both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  
  .bounce3 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.01s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`;