import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  PiComputerTower,
  PiUsersThree,
  PiGlobe,
  PiTrophy,
} from "react-icons/pi";

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  & .Parent {
    width: 100%;
    max-width: 1600px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 100px;

    & .Child {
      margin: 0 20px 100px 20px;
      width: 250px;
      height: 310px;
      padding: 2rem;
      color: #444444;
      background: #eaeaea;
      border-radius: 2rem;
      border: 2px solid rgba(243, 0, 103, 1);
      text-align: center;
      text-decoration: none;
      transition: all 0.2s ease-in-out;

      :hover {
        cursor: pointer;
        transform: scale(1.02);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 15px 45px;
      }

      & h2 {
        color: #f30067;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        font-family: "Orbitron", Arial, Helvetica, sans-serif;
        border-bottom: 2px solid #f30067;
      }

      & p {
        color: #444444;
      }

      & .Icon {
        color: #444444;
        font-size: 8rem;
      }
    }
  }

  @media only screen and (max-width: 1170px) {
    .Parent {
    }
  }

  @media only screen and (max-width: 1560px) {
  }
`;

const More = () => {
  return (
    <Body>
      <div className="Parent">
        <Link className="Child" to="/event">
          <div>
            <PiComputerTower className="Icon" />
            <h2>LAN</h2>
            <p>
              Delta på LAN-event där vi samlar alla våra medlemmar med fokus på
              spel och roligheter!
            </p>
          </div>
        </Link>
        <Link className="Child" to="/event">
          <div>
            <PiTrophy className="Icon" />
            <h2>Turneringar</h2>
            <p>
              Möt motståndare i en kamp om att vinna schyssta priser i en rad
              olika populära spel!
            </p>
          </div>
        </Link>
        <a className="Child" href="https://discord.gg/xsFZTPvnGt">
          <div>
            <PiGlobe className="Icon" />
            <h2>Online</h2>
            <p>
              Lira spel online via vår discord server och njut av långa svettiga
              nätter!
            </p>
          </div>
        </a>
        <Link className="Child" to="/membership">
          <div>
            <PiUsersThree className="Icon" />
            <h2>Gemenskap</h2>
            <p>
              Lär känna nya spelintresserade nördar och få livslånga vänner!
            </p>
          </div>
        </Link>
      </div>
    </Body>
  );
};

export default More;
