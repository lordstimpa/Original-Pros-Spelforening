import styled from "styled-components";
import ctt from "../../assets/keyboard.jpg";

const Body = styled.div`
  background: #eaeaea;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 60px 40px -7px;
  display: flex;
  justify-content: center;

  & .wrapper {
      max-width: 1600px;
      padding: 100px 45px;
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  & .Img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 300px;
      border-radius: 2rem;
      border: 2px solid rgba(243, 0, 103, 1);
      overflow: hidden;

      & img {
        object-fit: cover;
      }

      & h1 {
        position: absolute;
        color: #FFF;
        font-size: 7rem;
        z-index: 1;
        }
    }

  & .Text {
      margin: 1rem;
    > p {
        padding: 1rem;
    }

    > a {
        padding: 1rem;
    }
  }

  @media only screen and (max-width: 1170px) {
  }

  @media only screen and (max-width: 810px) {
    & .Title {
      & h1 {
        font-size: 10.5vw;
      }
    }
  }
`;

const Community = () => {
    return (
        <Body>
            <div className="wrapper">
                <div className="Body">
                    <div className="Img">
                        <h1>Gemenskap</h1>
                        <img src={ctt} />
                    </div>
                    <div className="Text">
                        <p>
                            Vår gemenskap sträcker sig bortom spelandet. Gå med i vår Discord-server och träffa andra entusiaster, dela dina spelupplevelser och diskutera de senaste spelnyheterna. Vi tror på att skapa starka band och vänskaper bland våra medlemmar.
                        </p>
                        <p>
                            I vår gemenskap har vi även dedikerade kanaler för att hjälpa varandra med tekniska frågor, strategier i spel och bara för att ha kul samtidigt. Vi tror att en stark community är kärnan i en framgångsrik spelförening.
                        </p>
                        <a href="https://discord.com/invite/8JS23pMX">
                            Gå med i vår Discord server!
                        </a>
                    </div>
                </div>
            </div>
        </Body>
    );
};

export default Community;
