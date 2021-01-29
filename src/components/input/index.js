import { Container } from "./styles";

function Input({id, value, handler, label, ...rest })
{
    return(
        <Container>
            <input id={id} {...rest} placeholder=" "/>
            <label htmlFor={id}>{label}</label>
           
        </Container>
    );
}

export default Input;