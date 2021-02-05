import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

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
  FormNewQuestion,
} from "./styles";

import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import { sigIn, signOut, getUser } from "../../services/security";
import styled from "styled-components";
import Modal from "../../components/Modal";
import Input from "../../components/input";
import Select from "../../components/Select";
import Tag from "../../components/Tag";

function Profile() {
  const student = getUser();

  return (
    <>
      <section>
        <img src={imgProfile} alt="imagem de perfil" alt="imagem de perfil" />
        <a href="#" />
      </section>
      <section>
        <strong>Nome:</strong>
        <p>{student.studentName}</p>
      </section>
      <section>
        <strong>Ra</strong>
        <p>{student.ra}</p>
      </section>
      <section>
        <strong>Email:</strong>
        <p>{student.email}</p>
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
        answer: response.data.answer,
        created_at: response.data.createdAt,
        Student: {
          id: aluno.studentId,
          name: aluno.name,
        },
      };

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

  const handleDisplay = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  const student = getUser();

  return (
    <QuestionCards>
      <header>
        <img
          src="https://avatars.githubusercontent.com/u/67705062?s=460&u=8e763c9a1ae4d6e7bc588627f533f73212037a8b&v=4"
          alt="imagem de perfil"
        />
        <strong>
          Por{" "}
          {student.studentId === question.Student.id
            ? "Você"
            : question.Student.name}
        </strong>
        <p>
          em {format(new Date(question.created_at), "dd/MM/yyyy 'às' HH:mm")}
        </p>
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
              {qtdAnswer} {qtdAnswer > 1 ? "Respostas" : "Resposta"}
            </>
          )}
        </h1>
        {answers.map((a) => (
          <Answer answers={a} display={display} />
        ))}

        <form onSubmit={handleSubmit}>
          <textarea
            minLength={10}
            placeholder="Responda essa duvida !"
            required
            onChange={(e) => setStoryAnswer(e.target.value)}
            value={storyAnswer}
          ></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCards>
  );
}

function Answer({ answers, display }) {
  const student = getUser();

  return (
    <section style={{ display: display }}>
      <header>
        <img src={imgProfile} alt="imagem de perfil" />
        <strong>
          Por{" "}
          {student.studentId === answers.Student.id
            ? "Você"
            : answers.Student.name}
        </strong>
        <p>{format(new Date(answers.created_at), "dd/MM/yyyy 'às' HH:mm")}</p>
      </header>
      <p>{answers.answer}</p>
    </section>
  );
}

function NewQuestion() {

const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try 
      {
        const response = await api.get("/categories")
        setCategories(response.data)
      } 
      catch (error) 
      {
        alert(error);
      }
    }

    loadCategories();
  }, []);

  return (
    <FormNewQuestion>
      <Input id="title" label="titulo" />
      <Input id="description" label="descrição" />
      <Input id="gist" label="Gist" />
      <Select id="categories" label="Categorias">
        <option value="">Selecione</option>
        {categories.map((c) => (
          <option value={c.id}>{c.description}</option>
        ))}
      </Select>
      <div></div>
      <input type="file" />
      <button>Enviar</button>
    </FormNewQuestion>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed", {});

      console.log(response.data);

      setQuestions(response.data);
    };

    loadQuestions();
  }, [reload]);

  const handleSingOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setReload(Math.random());
  };

  return (
    <>
      <Modal title="Faça uma pergunta">
        <NewQuestion></NewQuestion>
      </Modal>
      <Container>
        <Header>
          <Logo src={logo} alt="imagem de perfil" onClick={handleReload} />
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
    </>
  );
}

export default Home;
