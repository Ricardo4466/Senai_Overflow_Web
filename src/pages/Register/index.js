import { Container, FormLogin, Header, Body, Button} from "./styles";
import Input from "../../components/input";
function Register()
{
    return (
        <Container>
            <FormLogin>
                <Header>
                    <h1>BEM VINDO AO SENAIOVERFLOW!</h1>
                    <h2>INFORME SEUS DADOS</h2>
                </Header>
                <Body>
                    <Input id="ra" label="RA" type="text"/>
                    <Input id="name" label="Nome" type="text"/>
                    <Input id="email" label="E-mail" type="email" required/>
                    <Input id="password" label="senha" type="password"/>
                    <Input id="valid-password" label="Confirmar senha" type="password"/>
                    <Button>Enviar</Button>
                    <a href="#">ou Click aqui para sair!</a>
                </Body>
            </FormLogin>
        </Container>
    );
}
export default Register;