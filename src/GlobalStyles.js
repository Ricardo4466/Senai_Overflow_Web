import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


:root{
    --dark: #282a36;
    --darkGray:#44475a;
    --light: #EDF2F4;
    --primary: #EF233C;
    --secundary:#D90429;
}

*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

::-webkit-scrollbar{
    width:4px;
    background-color: var(--darkGray);

}

::-webkit-scrollbar-track{
    background-color: var(--darkGray);
}
::-webkit-scrollbar-thumb{
    background-color: var(--light);
    border-radius: 2px;
}

body{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: var(--light);
}


button{
    padding: 10px;
    font-weight: bold;
    color: var(--light);
    background-color: var(--darkGray);
    border: 1px solid var(--light);
    border-radius: 4px;

    cursor: pointer;

    transition: .2s;

    :hover{
        background-color: var(--primary);

    }

    :active{
        transform: scale(0.95);
    }

    :disabled{
        background-color: transparent;
        border: 1px solid var(--darkGray);
        color: var(--darkGray)
    }

    
}

a {
        color: var(--light);

        transition: .2s;

        :hover{
            color: var(--primary);
        }
        
        :active{
            transform: scale(0.95);
        }
    }

    textarea, select{
        resize:none;
        padding:5px;
        font-size:16px;
        border-radius: 4px;

        font-family: sans-serif;
    }

`;
