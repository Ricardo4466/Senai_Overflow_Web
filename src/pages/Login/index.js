import { Container, FormLogin } from "./styles";

function Login ()
{
    return (
        <Container>
            <FormLogin>
                <h1>Bem vindo ao Senai OverFlow!</h1>
                <label>E-mail</label>
                <input type="email"></input>
                <label>senha</label>
                <input type="password"></input>
                <button>Entar</button>
            </FormLogin>
        </Container>
    );
}


export default Login;