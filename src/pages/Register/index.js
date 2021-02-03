import { Container, FormLogin, Header, Body, Button } from "./styles";
import Input from "../../components/input";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";

function Register() {
  const history = useHistory();

  const [registerStudent, setRegisterStudent] = useState({
    ra: "",
    name: "",
    email: "",
    password: "",
    validPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (registerStudent.password !== registerStudent.validPassword)
        return alert("Senhas Diferentes");

      const response = await api.post("/students", {
        ra: registerStudent.ra,
        name: registerStudent.name,
        email: registerStudent.email,
        password: registerStudent.password,
      });

      console.log(response.data);

      // IMPLEMENTAR A AUTORIZAÇÃO

      history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const handleInput = (e) => {
    setRegisterStudent({ ...registerStudent, [e.target.id]: e.target.value });
  };
  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>BEM VINDO AO SENAI OVERFLOW!</h1>
          <h2>INFORME SEUS DADOS</h2>
        </Header>
        <Body>
          <Input
            id="ra"
            label="RA"
            type="text"
            value={registerStudent.ra}
            handler={handleInput}
            required
          />
          <Input
            id="name"
            label="Nome"
            type="text"
            value={registerStudent.name}
            handler={handleInput}
            required
          />
          <Input
            id="email"
            label="E-mail"
            type="email"
            required
            value={registerStudent.email}
            handler={handleInput}
            required
          />
          <Input
            id="password"
            label="senha"
            type="password"
            value={registerStudent.password}
            handler={handleInput}
            required
          />
          <Input
            id="validPassword"
            label="Confirmar senha"
            type="password"
            value={registerStudent.validPassword}
            handler={handleInput}
            required
          />
          <Button
            disabled={
              registerStudent.ra === "" ||
              registerStudent.name === "" ||
              registerStudent.email === "" ||
              registerStudent.password === "" ||
              registerStudent.validPassword === ""
            }
          >
            Enviar
          </Button>

          <Link to="/">Ou se ja tem cadastro clique Aqui para Entrar!</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}
export default Register;
