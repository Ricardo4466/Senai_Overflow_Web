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
import { sigIn, signOut, getUser } from "../../services/security";

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

  const qtdAnswer = question.Answers.length;

  const [display, setDisplay] = useState("none");
  const [storyAnswer, setStoryAnswer] = useState("");
  const [answers, setAnswer] = useState(question.Answers);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`questions/${question.id}/answers`, {
        answer: storyAnswer,
      });

      const aluno = getUser();

        const answerAdded = {
          id: response.data.id,
          description: response.storyAnswer,
          created_at: response.data.createdAt,
          Student:{
            id: aluno.StudentId,
            name: aluno.name,
          },
        } 

        setAnswer([...answers, answerAdded]);
        
        setStoryAnswer("");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  // const handleInput = (e) => {
  //   setStoryAnswer(e.target.value);


  // };

  const handleDisplay = () =>{
    if(display === "none")
    {
      setDisplay("block");
    }
    else{
      setDisplay("none");
    }
    
  } 

  return (
    <QuestionCards>
      <header>
        <img
          src="https://avatars.githubusercontent.com/u/67705062?s=460&u=8e763c9a1ae4d6e7bc588627f533f73212037a8b&v=4"
          alt="imagem de perfil"
        />
        <strong>Por: {question.Student.name}</strong>
        <p>em {question.created_at}</p>
      </header>
      <section>
        <strong>{question.title}</strong>
        <p>{question.description}</p>
        <img src={question.image} alt="imagem da publicação" />
      </section>
      <footer>
        <h1 onClick={handleDisplay}>
          {qtdAnswer === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {qtdAnswer}
              {" "}
              {qtdAnswer > 1 ? "Respostas" : "Resposta"}
            </>
          )}
        </h1>
        {answers.map((a) => (
          <Answer answers={a} display={display} />
        ))}

        <form onSubmit={handleSubmit}>
          <textarea minLength={10} placeholder="Responda essa duvida !" required onChange={(e) => setStoryAnswer(e.target.value)}></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCards>
  );
}

function Answer({ answers, display }) {
  return (
    <section style={{display:display}}>
      <header>
        <img src={imgProfile} alt="imagem de perfil" />
        <strong>Por {answers.Student.name} </strong>
        <p>{answers.created_at}</p>
      </header>
      <p>{answers.answer}</p>
    </section>
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
