import { Link, useHistory } from "react-router-dom";
import { Container, FormLogin, Header, Body, Button} from "./styles";
import Input from "../../components/input";
import {api} from "../../services/api"
import { useState } from "react";
import { sigIn } from "../../services/security";

function Login ()
{
    const history = useHistory();

    const  [login, setLogin ] = useState({
        email:"",
        password:"",
    })

    const handleSubmit = async (e) =>{
      e.preventDefault();
      
    try 
    {
        const response = await api.post("sessions", login);

        console.log(response.data);

        // IMPLEMENTAR A AUTORIZAÇÃO

        sigIn(response.data);

        history.push("/home");
        
    } 
    catch (error){
        console.error(error);
        alert(error.response.data.error);
    }

     
    };

    const handleInput = (e) => {
        setLogin({...login, [e.target.id]: e.target.value});
    };
    return (
        <Container>
            <FormLogin onSubmit={handleSubmit}>
                <Header>
                    <h1>BEM VINDO AO SENAI OVERFLOW!</h1>
                    <h2>O SEU PORTAL DE RESPOSTAS</h2>
                </Header>
                <Body>
                    <Input id="email" label="email" type="email" value={login.email} handler={handleInput} required/>
                    <Input id="password" label="senha" type="password"value={login.password} handler={handleInput} required/>
                    <Button>Entar</Button>
                    <Link to="/register"> ou Click aqui para sair!</Link>
                </Body>
            </FormLogin>
        </Container>
    );
}


export default Login;