import{
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCards,
} from "./styles";

import imgProfile from "../../assets/foto_perfil.png"

function Profile() 
{
  return(
    <>
      <section>
        <img src={imgProfile} />
        <a href="#" />
      </section>
      <section>
        <strong>Nome</strong>
        <p>Fulano de tal</p>
      </section>
      <section>
        <strong>Ra</strong>
        <p>12345678</p>
      </section>
      <section>
        <strong>Email:</strong>
        <p>Fulano@gmail.com</p>
      </section>
    </>
  );
}

function Home()
{
    return(
          <Container>

            

              <Header></Header>
              <Content>
                <ProfileContainer>
                  <Profile />
                </ProfileContainer>
                <FeedContainer>
                  <QuestionCards>
                    <header>
                      <img src={imgProfile} />
                      <strong>Por ciclano da silva</strong>
                      <p>em 12/12/12 as 12:12</p>
                    </header>
                    <section>
                    <img src={imgProfile} />
                      <strong>Por ciclano da silva</strong>
                      <p>em 12/12/12 as 12:12</p>
                    </section>
                    <footer></footer>
                  </QuestionCards>
                </FeedContainer>
                <ActionsContainer>
                    <button>
                      Fazer uma Pergunta!
                    </button>
                </ActionsContainer>
              </Content>
          </Container>
    );
}

export default Home;