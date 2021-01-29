import { Container, FormLogin, Header, Body, Button} from "./styles";
import Input from "../../components/input";


function Login ()
{
    return (
        <Container>
            <FormLogin>
                <Header>
                    <h1>BEM VINDO AO SENAIOVERFLOW!</h1>
                    <h2>O SEU PORTAL DE RESPOSTAS</h2>
                </Header>
                <Body>
                    <Input id="email" label="email" type="email"/>
                    <Input id="password" label="senha" type="password"/>
                    <Button>Entar</Button>
                    <a href="#">ou Click aqui para sair!</a>
                </Body>
            </FormLogin>
        </Container>
    );
}


export default Login;