import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 0px;
  height: 80px;
  margin: 10px;

  transition: width 0.4s;
  
  white-space: nowrap;
  overflow:hidden;

  border-radius: 4px;
  background-color: ${(props) => props.type === "error" ? "#D90429cc" : "#04d929cc" 
  };

  >h1{
      font-size: 18px;
      margin:5px;
  }
  
  >p{
      font-size: 14px;
      margin:5px;
  }

  > span {
    position: absolute;
    top: 15px;
    right: 20px;

    font-size: 30px;

    cursor: pointer;
    transition: 0.2s;

    :hover {
      color: var(--dark);
    }
  }

`;
