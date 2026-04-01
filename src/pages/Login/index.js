import { useHistory } from "react-router-dom";
import {
  Container,
  FormLogin,
  Header,
  Body,
  Button,
  AuthFooter,
  AuthHint,
  AuthLink,
  AuthDivider,
  GoogleBlock,
} from "./styles";
import Input from "../../components/input";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { api } from "../../services/api";
import { useState, useCallback } from "react";
import { sigIn } from "../../services/security";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import { getActiveBranding } from "../../theme/branding";

function Login() {
  const {
    loginBackground,
    loginHeroTitle,
    loginHeroSubtitle,
  } = getActiveBranding();

  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [isloading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(undefined);

  const showGoogleLogin = Boolean(process.env.REACT_APP_GOOGLE_CLIENT_ID);

  const handleGoogleCredential = useCallback(
    async (credential) => {
      setIsLoading(true);
      try {
        const response = await api.post("/sessions/google", { credential });
        sigIn(response.data);
        history.push("/home");
      } catch (error) {
        console.error(error);
        const description =
          error.response?.data?.error ||
          error.message ||
          "Não foi possível entrar com Google.";
        setMessage({ title: "Ops...", description });
      } finally {
        setIsLoading(false);
      }
    },
    [history]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await api.post("/sessions", login);
      sigIn(response.data);
      history.push("/home");
    } catch (error) {
      console.error(error);
      const description =
        error.response?.data?.error ||
        error.message ||
        "Não foi possível conectar à API. Verifique se o backend está em http://localhost:3333";
      setMessage({ title: "Ops...", description });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  return (
    <>
      {isloading && <Loading />}
        <Alert message={message} type="error" handleClose={setMessage}/>
        <Container $heroBg={loginBackground}>
        <FormLogin onSubmit={handleSubmit}>
          <Header>
            <h1>{loginHeroTitle}</h1>
            <h2>{loginHeroSubtitle}</h2>
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
            <Button type="submit">Entrar</Button>
            {showGoogleLogin && (
              <>
                <AuthDivider>ou</AuthDivider>
                <GoogleBlock>
                  <GoogleSignInButton onCredential={handleGoogleCredential} />
                </GoogleBlock>
              </>
            )}
            <AuthFooter>
              <AuthHint>Não tem conta?</AuthHint>
              <AuthLink to="/register">Criar cadastro</AuthLink>
            </AuthFooter>
          </Body>
        </FormLogin>
      </Container>
    </>
  );
}

export default Login;
