import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <MainWrapper>
      <div className="red-wrapper">
        <div className="text">No Matching Route</div>
        <div className="link-wrapper">
          <Link to="/" className="link">Back to Form</Link>
        </div>
      </div>
    </MainWrapper>
  )
}

export default NoMatch;

const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .red-wrapper {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 40px 0px;
    height: 30%;
    border: 8px solid;
    border-image: linear-gradient(45deg, rgb(255, 0, 255), rgb(250,224,66)) 1;
  }

  .text {
    text-align: center;
    font-size: 24px;
  }

  .link-wrapper {
    background-color: rgb(255, 0, 255);
    background: linear-gradient(45deg, rgb(255, 0, 255), rgb(250,224,66));
    width: 200px;
    text-align: center;
    padding: 20px 0px;
    margin: 20px;
    border-radius: 40px;
    border 2px solid black;
  }

  .link {
    text-decoration: none;
    color: black;
  }
`;