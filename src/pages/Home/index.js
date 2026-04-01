import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef, Suspense, lazy, useCallback } from "react";
import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCards,
  QuestionCardWrap,
  Logo,
  IconSingOut,
  FormNewQuestion,
  FileUploadWrap,
  FileUploadInput,
  FileUploadLabel,
  FileUploadIcon,
  FileUploadMeta,
  FileUploadPreview,
  GistIcon,
  ContainerGist,
  FeedEmptyState,
  FeedEmptyIcon,
  FeedEmptyTitle,
  FeedEmptyText,
  FeedEmptyButton,
  FeedSearchEmpty,
  FeedSearchIcon,
  FeedSearchTitle,
  FeedSearchHint,
  FeedEndMessage,
} from "./styles";
import FeedSkeleton from "../../components/FeedSkeleton";
import Tag from "../../components/Tag";
import { getActiveBranding } from "../../theme/branding";
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

const EmbedGist = lazy(() => import("react-embed-gist"));

function Profile({ setIsLoading, handleReload }) {
  const [student, setStudent] = useState(() => getUser());

  const handleImage = async (e) => {
    if (!e.target.files[0]) return;

    try {
      await validSquiredImage(e.target.files[0]);

      const data = new FormData();

      setIsLoading(true);

      data.append("image", e.target.files[0]);

      const response = await api.post(
        `/students/${student.studentId}/images`,
        data
      );

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
        <img
          src={student?.image || imgProfile}
          alt="imagem de perfil"
          width={120}
          height={120}
          decoding="async"
        />
        <label htmlFor="editImageProfile">editar foto</label>
        <input id="editImageProfile" type="file" onChange={handleImage} />
      </section>
      <section>
        <strong>Nome:</strong>
        <p>{student?.studentName}</p>
      </section>
      <section>
        <strong>Ra</strong>
        <p>{student?.ra ?? "—"}</p>
      </section>
      <section>
        <strong>Email:</strong>
        <p>{student?.email}</p>
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
      const response = await api.post(`/questions/${question.id}/answers`, {
        answer: storyAnswer,
      });

      const aluno = getUser();

      const answerAdded = {
        id: response.data.id,
        answer: response.data.answer,
        created_at: response.data.createdAt,
        Student: {
          id: aluno?.studentId,
          name: aluno?.studentName,
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
          width={36}
          height={36}
          decoding="async"
        />
        <strong>
          Por{" "}
          {student?.studentId === question.Student.id
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
        {question.image ? (
          <img
            src={question.image}
            alt="imagem da publicação"
            width={960}
            height={540}
            loading="lazy"
            decoding="async"
          />
        ) : null}
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
        <img
          src={answers.Student.image || imgProfile}
          alt="imagem de perfil"
          width={32}
          height={32}
          decoding="async"
        />
        <strong>
          Por{" "}
          {student?.studentId === answers.Student.id
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
    const file = e.target.files?.[0];
    const el = imageRef.current;
    if (file) {
      if (el) {
        el.src = URL.createObjectURL(file);
        el.style.display = "block";
      }
      setImage(file);
    } else {
      if (el) {
        el.src = "";
        el.style.display = "none";
      }
      setImage(null);
    }
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

    if (categoriesSel.length === 0) {
      alert("Selecione ao menos uma categoria.");
      return;
    }

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
      <FileUploadWrap>
        <FileUploadInput
          id="new-question-image"
          accept="image/*"
          onChange={handleImage}
        />
        <FileUploadLabel htmlFor="new-question-image">
          <FileUploadIcon aria-hidden />
          Arraste ou clique para escolher uma imagem (opcional)
        </FileUploadLabel>
        {image && <FileUploadMeta>{image.name}</FileUploadMeta>}
        <FileUploadPreview
          alt="Pré-visualização da imagem anexada"
          ref={imageRef}
        />
      </FileUploadWrap>
      <button type="submit">Publicar pergunta</button>
    </FormNewQuestion>
  );
}

function Gist({ gist, handleClose }) {
  if (!gist) return null;
  const formatedGist = gist.split(".com/").pop();
  return (
    <Modal
      title="Exemplo de código"
      handleClose={() => handleClose(undefined)}
    >
      <ContainerGist>
        <Suspense
          fallback={
            <p style={{ color: "var(--light)" }}>Carregando exemplo de código…</p>
          }
        >
          <EmbedGist gist={formatedGist} />
        </Suspense>
      </ContainerGist>
    </Modal>
  );
}

function Home() {
  const history = useHistory();
  const { logo, logoAlt } = getActiveBranding();

  const [questions, setQuestions] = useState([]);

  /** Incrementar para recarregar o feed desde a página 1 */
  const [feedTick, setFeedTick] = useState(0);

  const feedBusyRef = useRef(false);
  /** Troca quando o feed é reiniciado (logo / limpar busca); invalida requests antigas */
  const feedSessionRef = useRef(0);
  const pageRef = useRef(1);
  const totalRef = useRef(0);
  const qlenRef = useRef(0);

  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingFeed, setIsLoadingFeed] = useState(false);

  const [currentGist, setCurrentGist] = useState(undefined);

  const [search, setSearch] = useState("");

  const [totalQuestions, setTotalQuestions] = useState(0);

  const showFeedError = useCallback((err) => {
    console.error(err);
    const msg =
      err.response?.data?.error ||
      err.message ||
      "Não foi possível carregar o feed. A API está rodando em http://localhost:3333 ?";
    alert(msg);
  }, []);

  useEffect(() => {
    const session = ++feedSessionRef.current;

    const run = async () => {
      feedBusyRef.current = true;
      setIsLoadingFeed(true);
      try {
        const p = pageRef.current;
        const response = await api.get("/feed", {
          params: { page: p },
        });
        if (session !== feedSessionRef.current) return;

        pageRef.current = p + 1;
        setQuestions((prev) => {
          const next = [...prev, ...response.data];
          qlenRef.current = next.length;
          return next;
        });

        const count = response.headers["x-total-count"];
        const total = count != null ? Number(count) : 0;
        setTotalQuestions(total);
        totalRef.current = total;
      } catch (err) {
        if (session === feedSessionRef.current) {
          showFeedError(err);
        }
      } finally {
        feedBusyRef.current = false;
        if (session === feedSessionRef.current) {
          setIsLoadingFeed(false);
        }
      }
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- só feedTick reinicia o feed (showFeedError é estável)
  }, [feedTick]);

  const loadNextPage = useCallback(async () => {
    if (feedBusyRef.current) return;
    if (totalRef.current > 0 && qlenRef.current >= totalRef.current) return;

    const session = feedSessionRef.current;
    feedBusyRef.current = true;
    setIsLoadingFeed(true);
    try {
      const p = pageRef.current;
      const response = await api.get("/feed", {
        params: { page: p },
      });
      if (session !== feedSessionRef.current) return;

      pageRef.current = p + 1;
      setQuestions((prev) => {
        const next = [...prev, ...response.data];
        qlenRef.current = next.length;
        return next;
      });

      const count = response.headers["x-total-count"];
      if (count != null) {
        const total = Number(count);
        setTotalQuestions(total);
        totalRef.current = total;
      }
    } catch (err) {
      if (session === feedSessionRef.current) {
        showFeedError(err);
      }
    } finally {
      feedBusyRef.current = false;
      if (session === feedSessionRef.current) {
        setIsLoadingFeed(false);
      }
    }
  }, [showFeedError]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    feedBusyRef.current = false;
    pageRef.current = 1;
    totalRef.current = 0;
    qlenRef.current = 0;
    setShowNewQuestion(false);
    setIsLoading(false);
    setQuestions([]);
    setTotalQuestions(0);
    setSearch("");
    setFeedTick((t) => t + 1);
  };

  const feedScrollObserver = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (search.length >= 4) return;
    if (scrollHeight <= clientHeight + 5) return;
    if (scrollTop + clientHeight <= scrollHeight - 100) return;
    loadNextPage();
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length === 0) {
      pageRef.current = 1;
      totalRef.current = 0;
      qlenRef.current = 0;
      setQuestions([]);
      setTotalQuestions(0);
      feedBusyRef.current = false;
      setFeedTick((t) => t + 1);
      return;
    }

    if (value.length < 4) return;

    try {
      const response = await api.get("/questions", {
        params: { search: value },
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
          title="Nova pergunta"
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
          <Logo
            src={logo}
            alt={logoAlt}
            width={48}
            height={48}
            onClick={handleReload}
          />
          <InputSearch handler={handleSearch} value={search} />
          <IconSingOut onClick={handleSignOut} />
        </Header>
        <Content>
          <ProfileContainer>
            <Profile handleReload={handleReload} setIsLoading={setIsLoading} />
          </ProfileContainer>
          <FeedContainer onScroll={feedScrollObserver}>
            {questions.length === 0 && isLoadingFeed && <FeedSkeleton count={4} />}
            {questions.length === 0 && !isLoadingFeed && search.length <= 3 && (
              <FeedEmptyState>
                <FeedEmptyIcon aria-hidden />
                <FeedEmptyTitle>Nenhuma pergunta por aqui ainda</FeedEmptyTitle>
                <FeedEmptyText>
                  Publique uma dúvida para a comunidade ou volte mais tarde para ver
                  novidades no feed.
                </FeedEmptyText>
                <FeedEmptyButton
                  type="button"
                  onClick={() => setShowNewQuestion(true)}
                >
                  Fazer uma pergunta
                </FeedEmptyButton>
              </FeedEmptyState>
            )}
            {questions.length === 0 && !isLoadingFeed && search.length > 3 && (
              <FeedSearchEmpty>
                <FeedSearchIcon aria-hidden />
                <FeedSearchTitle>Nenhuma questão encontrada</FeedSearchTitle>
                <FeedSearchHint>
                  Tente outros termos ou uma busca mais curta.
                </FeedSearchHint>
              </FeedSearchEmpty>
            )}
            {questions.map((q, i) => (
              <QuestionCardWrap key={q.id} $delayIndex={i}>
                <Question
                  question={q}
                  setIsLoading={setIsLoading}
                  setCurrentGist={setCurrentGist}
                />
              </QuestionCardWrap>
            ))}
            {isLoadingFeed && questions.length > 0 && <SpinnerLoading />}
            {totalQuestions > 0 && totalQuestions === questions.length && (
              <FeedEndMessage role="status">Isso é tudo</FeedEndMessage>
            )}
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
