import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ReactEmbedGist from "react-embed-gist";

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
  GistIcon,
  ContainerGist,
} from "./styles";

import Tag from "../../components/Tag";
import logo from "../../assets/logo.png";
import { api } from "../../services/api";
import Modal from "../../components/Modal";
import Input from "../../components/input";
import Select from "../../components/Select";
import imgProfile from "../../assets/foto_perfil.png";
import { signOut, getUser, setUser } from "../../services/security";
import Loading from "../../components/Loading";

import { validSquiredImage } from "../../utils";
import InputSearch from "../../components/InputSearch";
import SpinnerLoading from "../../components/spinnerLoading";

function Profile({ setIsLoading, handleReload }) {
  const [student, setStudent] = useState(getUser());

  const handleImage = async (e) => {
    if (!e.target.files[0]) return;

    try {
      await validSquiredImage(e.target.files[0]);

      const data = new FormData();

      setIsLoading(true);

      data.append("image", e.target.files[0]);

      const response = await api.post(`/students/${student.id}/images`, data);

      setTimeout(() => {
        setStudent({ ...student, image: response.data.image });
        handleReload();
      }, 1000);

      setUser({ ...student, image: response.data.image });
    } catch (error) {
      setIsLoading(false);

      alert(error);
    }
  };

  return (
    <>
      <section>
        <img src={student.image || imgProfile} alt="imagem de perfil" />
        <label htmlFor="editImageProfile">editar foto</label>
        <input id="editImageProfile" type="file" onChange={handleImage} />
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

function Question({ question, setIsLoading, setCurrentGist }) {
  const [display, setDisplay] = useState("none");
  const [storyAnswer, setStoryAnswer] = useState("");
  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    setAnswer(question.Answers);
  }, [question.Answers]);

  const qtdAnswer = answers.length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (storyAnswer.length < 10)
      return alert("A Resposta deve ter no minimo 10 caracteres");

    setIsLoading(true);
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
      setIsLoading(false);

      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert(error);
      setIsLoading(false);
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
          src={question.Student.image || imgProfile}
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
        {question.gist && (
          <GistIcon onClick={() => setCurrentGist(question.gist)} />
        )}
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
          <Answer key={a.id} answers={a} display={display} />
        ))}

        <form onSubmit={handleSubmit}>
          <textarea
            minLength={10}
            placeholder="Responda essa duvida !"
            required
            onChange={(e) => setStoryAnswer(e.target.value)}
            value={storyAnswer}
          />
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
        <img src={answers.Student.image || imgProfile} alt="imagem de perfil" />
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

function NewQuestion({ handleReload, setIsLoading }) {
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
    if (newQuestion.gist) data.append("gist", newQuestion.gist);

    setIsLoading(true);
    try {
      await api.post("/questions", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      handleReload();
    } catch (error) {
      alert(error);
      setIsLoading(false);
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
          <option key={categories.id} value={c.id}>
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

function Gist({ gist, handleClose }) {
  if (gist) {
    const formatedGist = gist.split(".com/").pop();
    return (
      <Modal
        title="Exemplo de código"
        handleClose={() => handleClose(undefined)}
      >
        <ContainerGist>
          <ReactEmbedGist gist={formatedGist} />
        </ContainerGist>
      </Modal>
    );
  } else {
    return null;
  }
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null);

  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingFeed, setIsLoadingFeed] = useState(false);

  const [currentGist, setCurrentGist] = useState(undefined);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [totalQuestions, setTotalQuestions] = useState(0);

  const loadQuestions = async () => {
    // SE JA ESTIVER BUSCANDO, NA BUSCA NOVAMENTE
    if (isLoadingFeed) return;

    // console.log(totalQuestions == questions.length, totalQuestions, questions.length);
    // SE TIVER CHEGO NO FIM NÃO FAZ A REQUISIÇÃO NOVAMENTE
    if (totalQuestions > 0 && totalQuestions == questions.length) return;

    setIsLoadingFeed(true);

    const response = await api.get("/feed", {
      params: { page },
    });

    setPage(page + 1);

    setQuestions([...questions, ...response.data]);


    setTotalQuestions(response.headers["x-total-count"]);

    setIsLoadingFeed(false);
  };

  useEffect(() => {
    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setShowNewQuestion(false);
    setIsLoading(false);
    setPage(1);
    setQuestions([]);
    setSearch("");
    setReload(Math.random());
  };

  const feedScrollObserver = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollTop + clientHeight > scrollHeight - 100 && search.length < 4)
      loadQuestions();
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);

    if (e.target.value.length === 0) setReload(Math.random());

    if (e.target.value.length < 4) return;

    try {
      const response = await api.get("/questions", {
        params: { search: e.target.value },
      });

      setQuestions(response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <Gist gist={currentGist} handleClose={setCurrentGist} />
      {showNewQuestion && (
        <Modal
          title="Faça uma pergunta"
          handleClose={() => setShowNewQuestion(false)}
        >
          <NewQuestion
            handleReload={handleReload}
            setIsLoading={setIsLoading}
          />
        </Modal>
      )}
      <Container>
        <Header>
          <Logo src={logo} alt="imagem de perfil" onClick={handleReload} />
          <InputSearch handler={handleSearch} value={search} />
          <IconSingOut onClick={handleSignOut} />
        </Header>
        <Content>
          <ProfileContainer>
            <Profile handleReload={handleReload} setIsLoading={setIsLoading} />
          </ProfileContainer>
          <FeedContainer onScroll={feedScrollObserver}>
            {questions.length === 0 &&
              search.length > 3 &&
              "Nenhuma Questão Encontrada !!"}
            {questions.map((q) => (
              <Question
                key={questions.id}
                question={q}
                setIsLoading={setIsLoading}
                setCurrentGist={setCurrentGist}
              />
            ))}
            {isLoadingFeed && <SpinnerLoading />}
            {totalQuestions > 0 &&
              totalQuestions == questions.length &&
              "Isso é tudo"}
            {/* <button onClick={loadQuestions}>ver mais</button> */}
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
