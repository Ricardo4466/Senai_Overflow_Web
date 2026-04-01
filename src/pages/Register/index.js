import {
  Container,
  FormLogin,
  Header,
  Body,
  Button,
  AuthFooter,
  AuthHint,
  AuthLink,
} from "./styles";
import Input from "../../components/input";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";
import { sigIn } from "../../services/security";
import Loading from "../../components/Loading";
import { getActiveBranding } from "../../theme/branding";

function Register() {
  const {
    loginBackground,
    loginHeroTitle,
    registerHeroSubtitle,
  } = getActiveBranding();

  const history = useHistory();
  const [isloading, setIsLoading] = useState(false);


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
      if (registerStudent.password !== registerStudent.validPassword && !isloading)
        return alert("Senhas Diferentes");

        setIsLoading(true);
      const response = await api.post("/students", {
        ra: registerStudent.ra,
        name: registerStudent.name,
        email: registerStudent.email,
        password: registerStudent.password,
      });

      sigIn(response.data);
      history.push("/home");
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.error ||
        error.message ||
        "Não foi possível conectar à API.";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    setRegisterStudent({ ...registerStudent, [e.target.id]: e.target.value });
  };
  return (
    <>
      {isloading && <Loading />}
    <Container $heroBg={loginBackground}>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>{loginHeroTitle}</h1>
          <h2>{registerHeroSubtitle}</h2>
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

          <AuthFooter>
            <AuthHint>Já possui cadastro?</AuthHint>
            <AuthLink to="/">Entrar</AuthLink>
          </AuthFooter>
        </Body>
      </FormLogin>
    </Container>
    </>
  );
}
export default Register;
