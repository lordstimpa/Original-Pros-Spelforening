import styled from "styled-components";
import NavLinks from "./Sub-NavLinks";
import PostDate from "./Sub-PostDate";
import Keyboard from "../../assets/gamer.jpg";

const Body = styled.div`
  min-height: 100svh;
  width: 100%;
  background: #eaeaea;
  color: #444444;
  display: grid;
  grid-template-columns: 1fr 25px 175px minmax(0, 1350px) 175px 25px 1fr;
  grid-template-rows: 4rem 250px auto 5em;

  // Title section
  & .Title {
    grid-column: 1 / 8;
    grid-row: 2 / 3;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;

    & h1 {
      text-align: center;
      font-size: 4rem;
      color: #f30067;
      letter-spacing: 2rem;
      text-shadow: 1px 1px #eaeaea;
    }
  }

  // Info section
  & .Info {
    display: flex;
    flex-direction: column;
    grid-column: 4 / 5;
    grid-row: 3 / 4;
    height: fit-content;
    background: #eaeaea;
    padding: 2em;
    margin: 0 1rem;
    border-radius: 1rem;

    // General styling
    & > div,
    div > div {
      padding-bottom: 1rem;
    }

    & h2 {
      padding-bottom: 1rem;
    }

    & h4 {
      padding: 0.5rem 0;
    }

    & p,
    h4 {
      padding: 0.2rem 1rem;
    }

    & ol {
      padding: 0.2rem 3.2rem;
    }

    & div > a {
      font-weight: 700;
      text-decoration: none;
      color: #444444;
      padding-left: 1rem;

      :hover {
        color: #f30067;
      }
    }

    & #linkurl {
      font-weight: 700;
      text-decoration: none;
      color: #444444;

      :hover {
        color: #f30067;
      }
    }

    // Error / Loading / Notfound
    & .Loading,
    .Error,
    .NotFound {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    // Member
    & .Medlem {
      display: flex;
      justify-content: center;
      text-align: center;

      a {
        width: fit-content;
        color: #f30067;
        border-radius: 2em;
        border: 2px solid #f30067;
        padding: 0.5em 5em;
        margin: 1rem;
        text-decoration: none;
        transition: 0.2s ease-in-out;

        :hover {
          cursor: pointer;
          transform: scale(1.05);
          color: #eaeaea;
          background: #f30067;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 15px 45px;
        }
      }
    }

    // Board
    & .CardContainer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      & .Card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 40%;
        margin: 0 2rem 2rem 0;
        border-radius: 1rem;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

        & img {
          width: 70%;
          border-radius: 100%;
          margin: 2rem 1rem;
        }
      }
    }

    // Event
    & .EventHeader {
      display: flex;
      justify-content: space-between;
      margin: 1rem;
    }

    & .EventContainer {
      position: relative;
      display: flex;
      align-self: center;
      flex-direction: column;
      margin: 1rem;
      text-align: center;
      border-radius: 2rem;
      border: 3px solid #f30067;
      overflow: hidden;
      transition: 0.2s ease-in-out;

      & img {
        width: 100%;
      }

      & .TextContainer {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem 0;
        backdrop-filter: blur(15px);
        background: rgba(0, 0, 0, 0.4);
        z-index: 1;

        & h2 {
          color: #f30067;
          text-shadow: 1px 1px #eaeaea;
          font-size: 4rem;
        }

        & p {
          color: #eaeaea;
          margin-top: 1rem;
        }
      }

      :hover {
        cursor: pointer;
        transform: scale(1.02);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 15px 45px;
      }
    }
  }

  @media only screen and (max-width: 1280px) {
    grid-template-columns: 1fr 25px 175px minmax(0, 1350px) auto 25px 1fr;

    & .Title {
      & h1 {
        letter-spacing: normal;
      }
    }

    & .Info {
      grid-column: 4 / 6;
    }
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr 25px minmax(0, 1350px) 25px 1fr;

    & .Info {
      grid-column: 3 / 4;
      grid-row: 3 / 4;
      padding: 0;
      padding-top: 2rem;

      & .CardContainer {
        & .Card {
          margin: 0 0 2rem 0;
        }
      }

      & .EventContainer {
        width: 77svw;
        margin: 1rem 0;
      }
    }
  }

  @media only screen and (max-width: 720px) {
    & .Title {
      padding: 1rem 0 1rem 0;
      & h1 {
        letter-spacing: normal;
        font-size: 9vw;
      }
    }
  }

  @media only screen and (max-width: 680px) {
    & .Info {
      & .CardContainer {
        & .Card {
          width: 100%;
        }
      }

      & .Medlem {
        & a {
          padding: 0.5rem 1rem;
        }
      }

      & .EventHeader {
        flex-direction: column;

        & .EventName {
          margin-bottom: 1rem;
        }
      }
    }
  }
`;

const DynamicComponent = ({ contentComponent }) => {
  return (
    <Body image={Keyboard}>
      <NavLinks />
      {contentComponent}
      <PostDate />
    </Body>
  );
};

export default DynamicComponent;
