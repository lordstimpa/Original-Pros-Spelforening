import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";

const Body = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  padding-top: 2rem;

  & .Links {
    margin-bottom: 2rem;

    & > div {
      margin-bottom: 1rem;
    }

    & h2 {
      margin-bottom: 1rem;
    }

    & .LinkContainer {

      & .MainLinkContainer {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

        & .MainLink {
          font-weight: 600;
          padding: 0.6rem;
          width: 100%;
        }

        & .Arrow {
          padding: 0.8rem;

          :hover {
            color: #f30067;
            cursor: pointer;
          }
        }

        & #Arrow1 {
          transform: ${(props) =>
            props.dropMenu1 ? "rotate(0)" : "rotate(-90deg)"};
        }

        & #Arrow2 {
          transform: ${(props) =>
            props.dropMenu2 ? "rotate(0)" : "rotate(-90deg)"};
        }
      }

      & .DropDownLinkContainer {
        display: flex;
        flex-direction: column;
        width: 100%;

        & .Link {
          padding: 0.6rem;
          width: auto;
        }

        & .Link:last-of-type {
          margin-bottom: 1rem;
        }
      }

      & .Link,
      .MainLink {
        text-decoration: none;
        color: #444444;
        width: fit-content;

        :hover {
          color: #f30067;
        }
      }

      & .active {
        color: #f30067;
      }
    }
  }

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const NavLinks = () => {
  const [dropMenu1, setDropMenu1] = useState(false);
  const [dropMenu2, setDropMenu2] = useState(false);

  const handleDrop1 = () => {
    setDropMenu1(!dropMenu1);
  };

  const handleDrop2 = () => {
    setDropMenu2(!dropMenu2);
  };

  return (
    <Body dropMenu1={dropMenu1} dropMenu2={dropMenu2}>
      <div className="Links">
        <div>
          <h2>Länkar</h2>
        </div>

        <div className="LinkContainer">
          <div className="MainLinkContainer">
            <NavLink
              to={`/membership`}
              className="MainLink"
              activeclassname="active"
            >
              Medlemskap
            </NavLink>
          </div>

          <div className="MainLinkContainer">
            <NavLink
              to={`/about`}
              className="MainLink"
              activeclassname="active"
            >
              Om ORG
            </NavLink>
            <AiOutlineDown
              className="Arrow"
              id="Arrow1"
              onClick={handleDrop1}
            />
          </div>

          {dropMenu1 && (
            <div className="DropDownLinkContainer">
              <NavLink
                to={`/about/history`}
                className="Link"
                activeclassname="active"
              >
                Historia
              </NavLink>

              <NavLink
                to={`/about/vision`}
                className="Link"
                activeclassname="active"
              >
                Vår vision
              </NavLink>

              <NavLink
                to={`/about/board`}
                className="Link"
                activeclassname="active"
              >
                Styrelse
              </NavLink>

              <NavLink
                to={`/about/statutes`}
                className="Link"
                activeclassname="active"
              >
                Stadgar
              </NavLink>

              <NavLink
                to={`/about/annual-reports`}
                className="Link"
                activeclassname="active"
              >
                Årsredovisningar
              </NavLink>
            </div>
          )}

          <div className="MainLinkContainer">
            <NavLink
              to={`/event`}
              className="MainLink"
              activeclassname="active"
            >
              Event
            </NavLink>
            <AiOutlineDown
              className="Arrow"
              id="Arrow2"
              onClick={handleDrop2}
            />
          </div>

          {dropMenu2 && (
            <div className="DropDownLinkContainer">
              <NavLink
                to={`/event/upcomming-events`}
                className="Link"
                activeclassname="active"
              >
                Kommande event
              </NavLink>

              <NavLink
                to={`/event/past-events`}
                className="Link"
                activeclassname="active"
              >
                Tidigare event
              </NavLink>
            </div>
          )}

          <div className="MainLinkContainer">
            <NavLink
              to={`/contact`}
              className="MainLink"
              activeclassname="active"
            >
              Kontakt
            </NavLink>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default NavLinks;
