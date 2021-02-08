import { format, addDays } from "date-fns";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

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

import styled from "styled-components";
import Tag from "../../components/Tag";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import Modal from "../../components/Modal";
import Input from "../../components/input";
import Select from "../../components/Select";
import imgProfile from "../../assets/foto_perfil.png";
import { sigIn, signOut, getUser } from "../../services/security";

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

  useEffect(() => {
    setStoryAnswer(question.Answers);

  }, [question.Answers])

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

function NewQuestion({handleReload}) {

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    gist: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);

  const [categoriesSel, setCategoriesSel] = useState([]);

  const [image, setImage] = useState(null);

  const imageRef = useRef();

  const categoriesRef = useRef();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        alert(error);
      }
    };

    loadCategories();
  }, []);

  const handleCategories = (e) => {
    const idSel = e.target.value;

    const categorySel = categories.find((c) => c.id.toString() === idSel);

    if (categorySel && !categoriesSel.includes(categorySel))
      setCategoriesSel([...categoriesSel, categorySel]);

    e.target[e.target.selectedIndex].disabled = true;
    e.target.value = "";
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);
      imageRef.current.style.display = "flex";
    } else {
      imageRef.current.src = "";
      imageRef.current.style.display = "none";
    }

    setImage(e.target.files[0]);
  };

  const handleUnselCategory = (idUnsel) => {
    setCategoriesSel(categoriesSel.filter((c) => c.id !== idUnsel));

    const { options } = categoriesRef.current;

    for (var i = 0; i < options.length; i++) {
      if (options[i].value === idUnsel.toString()) options[i].disabled = false;
    }
  };

  const handleInput = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.id]: e.target.value });
  };


  const handleAddNewQuestion = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", newQuestion.title);
    data.append("description", newQuestion.description);
   
    const categories = categoriesSel.reduce((s, c) => (s += c.id + ","), "");

    data.append("categories", categories.substr(0, categories.length - 1));

    if (image) data.append("image", image);
    if(newQuestion.gist) data.append("gist", newQuestion.gist);


    try {
      await api.post("/questions", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      handleReload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <FormNewQuestion onSubmit={handleAddNewQuestion}>
      <Input
        id="title"
        label="titulo"
        value={newQuestion.title}
        handler={handleInput}
        required
      />
      <Input
        id="description"
        label="descrição"
        value={newQuestion.description}
        handler={handleInput}
      />
      <Input
        id="gist"
        label="Gist"
        value={newQuestion.gist}
        handler={handleInput}
      />
      <Select
        id="categories"
        label="Categorias"
        handler={handleCategories}
        ref={categoriesRef}
      >
        <option value="">Selecione</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.description}
          </option>
        ))}
      </Select>
      <div>
        {categoriesSel.map((c) => (
          <Tag
            key={c.id}
            info={c.description}
            handleClose={() => handleUnselCategory(c.id)}
          ></Tag>
        ))}
      </div>
      <input type="file" onChange={handleImage} />
      <img alt="Pré-visualização" ref={imageRef} />
      <button>Enviar</button>
    </FormNewQuestion>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null);

  const [showNewQuestion, setShowNewQuestion] = useState(false);

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
    setShowNewQuestion(false);
    setReload(Math.random());
  };

  return (
    <>
      {showNewQuestion && (
        <Modal
          title="Faça uma pergunta"
          handleClose={() => setShowNewQuestion(false)}
        >
          <NewQuestion handleReload={handleReload}/>
        </Modal>
      )}
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
            <button onClick={() => setShowNewQuestion(true)}>
              Fazer uma Pergunta!
            </button>
          </ActionsContainer>
        </Content>
      </Container>
    </>
  );
}

export default Home;
