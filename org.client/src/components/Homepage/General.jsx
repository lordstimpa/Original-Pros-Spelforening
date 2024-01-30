import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef } from "react";
import ctt from "../../assets/header_ctt.png";

const Body = styled.div`
  background: #eaeaea;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 60px 40px -7px;
  display: flex;
  justify-content: center;

  & .wrapper {
    max-width: 1600px;
    padding: 0 25px 100px 25px;
  }

  & .Title {
    padding: 100px 0;

    & h1 {
      text-align: center;
      color: #f30067;
      font-size: 5rem;
    }
  }

  & .Body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .Text {
    width: 50%;

    & div {
      margin-bottom: 1rem;
    }

    & h2 {
      padding-bottom: 1rem;
      color: #f30067;
    }

    & p {
      padding: 0.2rem 1rem;
    }

    & .LinkPage {
      text-decoration: none;
      font-weight: 600;
      color: #444444;
      padding: 0.2rem 1rem;

      :hover {
        color: #f30067;
      }
    }
  }

  & .Img {
    & img {
      height: auto;
      width: 600px;
    }
  }

  @media only screen and (max-width: 1170px) {
    & .Text {
      width: 100%;
    }

    & .Img {
      display: none;
    }
  }

  @media only screen and (max-width: 810px) {
    & .Title {
      & h1 {
        font-size: 10.5vw;
      }
    }
  }
`;

const General = ({ generalRef }) => {
  return (
    <Body ref={generalRef}>
      <div className="wrapper">
        <div className="Title">
          <h1>Allmänt om ORG</h1>
        </div>

        <div className="Body">
          <div className="Text">
            <div>
              <h2>Spelförening</h2>
              <p>
                ORG grundades år 2009 och har under en längre period endast
                bestått av ett fåtal medlemmar som haft kul tillsammans. Nu har
                vi valt att ta ORG till nästa nivå!
              </p>
              <p>
                Genom att göra ORG till en äkta spelförening öppnar vi nu upp
                portarna för fler medlemmar för att ta del av gemenskapen och
                allt roligt som kommer längs resan.
              </p>
              <Link to="/about" className="LinkPage">
                Mer om ORG!
              </Link>
            </div>
            <div>
              <h2>Medlemskap</h2>
              <p>
                Som gratismedlem så bidrar man till organisationen mer än vad
                man tror. Med hjälp av statligt subventionerade bidrag så får
                organisationen möjlighet till att anordna större event och
                turneringar.
              </p>
              <p>
                För att man som medlem ska kunna delta på event och turneringar
                så behöver man betala en avgift på 150kr som täcker ett helt år
                av evenemang som ORG har att erbjuda.
              </p>
              <Link to="/membership" className="LinkPage">
                Mer om medlemskap!
              </Link>
            </div>
            <div>
              <h2>Event</h2>
              <p>
                Vi kommer att erhålla event och turneringar året om, framförallt
                när majoriteten av medlemmarna har det ledigt från jobb och
                studier.
              </p>
              <Link to="/event" className="LinkPage">
                Mer om event!
              </Link>
            </div>
          </div>

          <div className="Img">
            <img src={ctt} alt="Counter Strike characters." />
          </div>
        </div>
      </div>
    </Body>
  );
};

export default General;
