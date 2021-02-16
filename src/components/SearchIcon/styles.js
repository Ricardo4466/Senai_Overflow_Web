import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin-top: 10px;
  display: flex;
  > input {
    min-width: 320px;
    max-width: 400px;
    border: 0;
    padding-left: 10px;
    border-radius: 20px;
    background-color: var(--darkGray);
    font-family: sans-serif;
    color: white;
    
  }

  >button{
    min-width: 100px;
    max-width: 80px;
    border-radius: 20px;
    
    margin-bottom: 10px;
    margin-left:2px;
  }

  > label {
    cursor: text;
    position: absolute;
    top: 0;
    left: 10px;
    color: var(--darkGray);
    display: flex;
    align-items: center;
  }


  > input,
  > label {
    width: 100%;
    height: 30px;
    font-size: 16px;
    transition: 0.2s ease-in-out;
  }

  > input:not(:placeholder-shown) + label,
  > input:focus + label {
    left: 0;
    font-size: 14px;
    color: var(--light);
    top: -25px;
  }
`;