import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCards,
  Logo,
  IconSingOut,
} from "./styles";

import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import { sigIn, signOut } from "../../services/security";
function Profile() {
  return (
    <>
      <section>
        <img
          src="https://avatars.githubusercontent.com/u/67705062?s=460&u=8e763c9a1ae4d6e7bc588627f533f73212037a8b&v=4"
          alt="imagem de perfil"
        />
        <a href="#" />
      </section>
      <section>
        <strong>Nome:</strong>
        <p>Ricardo Lima</p>
      </section>
      <section>
        <strong>Ra</strong>
        <p>12345678</p>
      </section>
      <section>
        <strong>Email:</strong>
        <p>Ricardo@gmail.com</p>
      </section>
    </>
  );
}

function Question({ question }) {
  console.log(question);

  return (
    <QuestionCards>
      <header>
        <img
          src="https://avatars.githubusercontent.com/u/67705062?s=460&u=8e763c9a1ae4d6e7bc588627f533f73212037a8b&v=4"
          alt="imagem de perfil"
        />
        <strong>Por: {question.Student.name}</strong>
        <p>em 12/12/12 as 12:12</p>
      </header>
      <section>
        <strong>Título</strong>
        {/* <p>{question.description}</p> */}
        <img
          src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
          alt="imagem da publicação"
        />
      </section>
      <footer>
        <h1>12 Respostas</h1>
        <section>
          <header>
            <img src={imgProfile} alt="imagem de perfil" />
            <strong>Por ciclano </strong>
            <p>12/12/12 as 12:12</p>
          </header>
          <p>Resposta para a pergunta</p>
        </section>
        <form>
          <textarea placeholder="Responda essa duvida !" required></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCards>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed", {});

      console.log(response.data);

      setQuestions(response.data);
    };

    loadQuestions();
  }, []);

  const handleSingOut = () => {
    signOut();

    history.replace("/");
  };

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="imagem de perfil" />
        <IconSingOut onClick={handleSingOut} />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          {questions.map((q) => (
            <Question question={q} />
          ))}
        </FeedContainer>
        <ActionsContainer>
          <button>Fazer uma Pergunta!</button>
        </ActionsContainer>
      </Content>
    </Container>
  );
}

export default Home;
