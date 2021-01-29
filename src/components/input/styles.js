
import styled from "styled-components";

export const Container = styled.div`
    
    width: 100%;
    position: relative;
    margin-top: 15px;

    > input {
      border: 0px;
      padding-left: 10px;
      border-radius: 3px;

      font-family: sans-serif;
    }
    
    >label{
        top: 0px;
        left: 10px;
        position:absolute;
        display:flex;
        align-items: center;

        transition: 0.2s ease-in-out;

        color: var(--darkGray);

        cursor: text;

        pointer-events: none;
    }

    >input,
    >label{
        width:100%;
        height:30px;
        font-size: 16px;
    }

    >input:focus{
        border-bottom: 2px solid var(--darkGray);
    }

    >input:not(:placeholder-shown) + label,
    >input:focus + label{
        
        color: var(--light);
        font-size: 14px;
        top:-25px;
        left: 0px;
    }   
`;
