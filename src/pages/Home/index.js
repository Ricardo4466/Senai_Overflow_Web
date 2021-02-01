import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCards,
  Logo,
  IconSingOut
} from "./styles";

import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";

function Profile() {
  return (
    <>
      <section>
        <img src="https://avatars.githubusercontent.com/u/67705062?s=460&u=8e763c9a1ae4d6e7bc588627f533f73212037a8b&v=4" />
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

function Home() {
  return (
    <Container>
      <Header>
        <Logo src={logo} />
        <IconSingOut />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          <QuestionCards>
            <header>
              <img src="https://avatars.githubusercontent.com/u/67705062?s=460&u=8e763c9a1ae4d6e7bc588627f533f73212037a8b&v=4"/>
              <strong>Por: Ricardo Lima</strong>
              <p>em 12/12/12 as 12:12</p>
            </header>
            <section>
              <strong>Título</strong>
              <p>Descrição</p>
              <img src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />
            </section>
            <footer>
              <h1>12 Respostas</h1>
              <section>
                <header>
                  <img src={imgProfile} />
                  <strong>Por ciclano </strong>
                  <p>12/12/12 as 12:12</p>
                </header>
                <p>Resposta para a pergunta</p>
              </section>
              <form>
                <textarea
                  placeholder="Responda essa duvida !"
                  required
                ></textarea>
                <button>Enviar</button>
              </form>
            </footer>
          </QuestionCards>
          <QuestionCards>
            <header>
              <img src={imgProfile} />
              <strong>Por ciclano da silva</strong>
              <p>em 12/12/12 as 12:12</p>
            </header>
            <section>
              <strong>Título</strong>
              <p>Descrição</p>
              <img src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />
            </section>
            <footer>
              <h1>12 Respostas</h1>
              <section>
                <header>
                  <img src={imgProfile} />
                  <strong>Por ciclano </strong>
                  <p>12/12/12 as 12:12</p>
                </header>
                <p>Resposta para a pergunta</p>
              </section>
              <form>
                <textarea
                  placeholder="Responda essa duvida !"
                  required
                ></textarea>
                <button>Enviar</button>
              </form>
            </footer>
          </QuestionCards>
        </FeedContainer>
        <ActionsContainer>
          <button>Fazer uma Pergunta!</button>
        </ActionsContainer>
      </Content>
    </Container>
  );
}

export default Home;
