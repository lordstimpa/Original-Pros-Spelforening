import styled from "styled-components";
import { Link } from "react-router-dom";
import ORG from "../../assets/org.png/";
import { BsDiscord, BsFacebook, BsSteam } from "react-icons/bs";

const Body = styled.div`
  width: 100%;
  min-height: 400px;
  background: #000;

  & .MainContainer1 {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-height: 325px;

    & .Container1 {
      width: 300px;
      display: flex;
      justify-content: center;

      & .ImgContainer {
        & img {
          width: 200px;
          height: 200px;
        }
      }
    }

    & .Container2 {
      width: 300px;

      & > div {
        margin: 2rem 2rem 2rem 0;
      }

      & p {
        color: #eaeaea;
      }

      & a {
        margin: 2rem 2rem 2rem 0;
        color: #eaeaea;

        :hover {
          color: #f30067;
        }

        & .Icon {
          font-size: 1.7rem;
          vertical-align: center;
          transition: 0.2s ease-in-out;
        }
      }
    }
  }

  & .MainContainer2 {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;

    & .Container1 {
      background: #000;

      & > div:first-of-type {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }

      & .Link {
        margin: 2rem;
        margin-bottom: 0;
        color: #eaeaea7d;
        text-decoration: none;
        transition: 0.2s ease-in-out;

        :hover {
          color: #eaeaea;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    & .MainContainer1 {
      flex-direction: column;
      align-items: center;

      & .Container1 {
        margin: 2rem;
        margin-bottom: 0;
      }

      & .Container2 {
        margin: 1rem 2rem;

        & div:first-of-type {
          display: flex;
          justify-content: space-evenly;
          margin: 0;

          & a {
            margin: 0;
          }
        }

        & div:last-of-type {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 0;
        }
      }
    }

    & .MainContainer2 {
      & .Container1 {
        & > div:first-of-type {
          & .Link {
            margin: 0.3rem;
          }
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <Body>
      <div className="MainContainer1">
        <div className="Container1">
          <div className="ImgContainer">
            <img src={ORG} />
          </div>
        </div>
        <div className="Container2">
          <div>
            <a href="https://www.facebook.com/profile.php?id=61550534154840">
              <BsFacebook className="Icon" />
            </a>
            <a href="https://steamcommunity.com/groups/originalpro">
              <BsSteam className="Icon" />
            </a>
            <a href="https://discord.gg/8JS23pMX">
              <BsDiscord className="Icon" />
            </a>
          </div>
          <div>
            <p>©2023 Original Pros Spelförening.</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
      </div>
      <div className="MainContainer2">
        <div className="Container1">
          <div>
            <Link to="/terms-of-service" className="Link">
              Användarvillkor
            </Link>
            <Link to="/privacy-notice" className="Link">
              Integritetspolicy
            </Link>
            <Link to="/cookie-policy" className="Link">
              Cookie-Policy
            </Link>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default Footer;
