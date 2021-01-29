import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: var(--dark);

  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: var(--primary);
  box-shadow: 0px 1px 5px var(--darkGray);
  border-bottom: 1px solid var(--darkGray);
`;

export const Content = styled.div`
  width: 1280px;
  padding-top: 60px;
  display: grid;
  grid-template-columns: 20% 60% 20%;
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 10px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 10px;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 35%;
    border-radius: 50%;
  }
`;

export const ActionsContainer = styled.div`
  padding-top: 10px;
`;

export const QuestionCards = styled.article`
  width: 80%;
 
  
  background-color: var(--darkGray);
  border-radius: 4px;

  > header {
    display: flex;
    align-items: center;
    gap:10px;

    > img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }
  }

  >section{
      margin-top:10px;

      display:flex;
      flex-direction: column;
      gap:10px;

      >strong{
          font-size: 18px;
      }

      >p{
          font-size:15px;
          padding: 10px 5px;
           border-left: 2px solid var(--primary);

      }

      >img{
          max-width:100%;
          align-self:center;
      }
  }
`;
