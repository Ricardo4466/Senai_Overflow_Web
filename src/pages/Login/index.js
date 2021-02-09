import { Link, useHistory } from "react-router-dom";
import { Container, FormLogin, Header, Body, Button } from "./styles";
import Input from "../../components/input";
import { api } from "../../services/api";
import { useState } from "react";
import { sigIn } from "../../services/security";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

function Login() {

  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [isloading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await api.post("sessions", login);

      console.log(response.data);


      // IMPLEMENTAR A AUTORIZAÇÃO

      sigIn(response.data);

      setIsLoading(false);

      history.push("/home");
    } catch (error) {
        setIsLoading(false);
      console.error(error);
      setMessage({title: "Ops...", description: error.response.data.error})
    }
  };

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  return (
    <>
      {isloading && <Loading />}
        <Alert message={message} type="error" handleClose={setMessage}/>
        <Container>
        <FormLogin onSubmit={handleSubmit}>
          <Header>
            <h1>BEM VINDO AO SENAI OVERFLOW!</h1>
            <h2>O SEU PORTAL DE RESPOSTAS</h2>
          </Header>
          <Body>
            <Input
              id="email"
              label="email"
              type="email"
              value={login.email}
              handler={handleInput}
              required
            />
            <Input
              id="password"
              label="senha"
              type="password"
              value={login.password}
              handler={handleInput}
              required
            />
            <Button>Entar</Button>
            <Link to="/register"> ou Click aqui para sair!</Link>
          </Body>
        </FormLogin>
      </Container>
    </>
  );
}

export default Login;
