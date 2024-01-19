import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineDown } from "react-icons/ai";
import { HiX } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import Org from "../../assets/org.png";
import MobileNav from "./Mobile-Nav";

const Body = styled.div`
  position: fixed;
  width: 100%;
  height: 65px;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  background: ${(props) =>
    props.isScrolled ||
    props.isClicked ||
    (!props.isHomePage && props.currentPath !== "/latest-news")
      ? "rgb(0, 0, 0)"
      : "none"};
  z-index: 2;

  /* ORG logo and hamburger menu shown in the navbar */
  & .First {
    display: flex;
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
    justify-content: space-between;

    & .NameContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 2rem;
      margin-top: ${(props) =>
        props.isScrolled ||
        props.isClicked ||
        (!props.isHomePage && props.currentPath !== "/latest-news")
          ? "0"
          : "2rem"};

      & .Org {
        z-index: 1;
        & img {
          width: ${(props) =>
            props.isScrolled ||
            props.isClicked ||
            (!props.isHomePage && props.currentPath !== "/latest-news")
              ? "80px"
              : "200px"};
          margin-top: ${(props) =>
            props.isScrolled ||
            props.isClicked ||
            (!props.isHomePage && props.currentPath !== "/latest-news")
              ? "1.5rem"
              : "10rem"};
          clip-path: ${(props) =>
            props.isScrolled ||
            props.isClicked ||
            (!props.isHomePage && props.currentPath !== "/latest-news")
              ? "inset(0 0 1.3rem 0)"
              : "inset(0 0 0 0)"};
        }
      }
    }
  }

  & .Second {
    z-index: 2;
  }

  /* Links shown in the navbar */
  & .LinksContainer {
    position: absolute;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-weight: 700;

    & .Link {
      color: #fff;
      padding: 1.3em;
      transition: color 0.2s ease-in-out;

      & .Arrow {
        vertical-align: middle;
      }

      :hover {
        color: #00d1cd;
      }
    }

    & .DropLinkContainer {
      display: flex;
      flex-direction: column;
      position: relative;
      display: inline-block;
    }

    & .DropContent {
      visibility: hidden;
      display: flex;
      flex-direction: column;
      position: absolute;
      min-width: 200px;
      padding: 0.5em;
      margin-top: 1em;
      margin-left: 1em;
      backdrop-filter: blur(50px);
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid #00d1cd;
      border-radius: 0.5em;
      z-index: 9999;

      & .DropLink {
        color: #eaeaea;
        text-decoration: none;
        padding: 0.5em 1em;
        display: block;
        border-radius: 1em;

        :hover {
          color: #00d1cd;
        }
      }
    }

    & .DropLinkContainer:hover .DropContent,
    .DropLinkContainer:active .DropContent {
      visibility: visible;
    }
  }

  & .BurgerContainer {
    display: none;
    align-items: center;
    padding: 1em;

    & .HamburgerIcon {
      padding: 0.3em;
      color: #444444;
      background: #f30067;
      border-radius: 50%;
      font-size: 2em;
      transition: color 0.2s ease-in-out;

      :hover {
        cursor: pointer;
        color: #eaeaea;
      }
    }
  }

  & .Link {
    text-decoration: none;
  }

  @media only screen and (max-width: 1170px) {
    & .First {
      .NameContainer {
        & .Org {
          & img {
            width: ${(props) =>
              props.isScrolled ||
              props.isClicked ||
              (!props.isHomePage && props.currentPath !== "/latest-news")
                ? "80px"
                : "100px"};
            margin-top: ${(props) =>
              props.isScrolled ||
              props.isClicked ||
              (!props.isHomePage && props.currentPath !== "/latest-news")
                ? "1.5rem"
                : "3rem"};
          }
        }
      }
    }

    & .BurgerContainer {
      display: flex;
    }

    & .LinksContainer {
      display: none;
    }
  }
`;

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 5;

      if (scrollPosition >= threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMobileNavClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Body
      isScrolled={isScrolled}
      isClicked={isClicked}
      isHomePage={isHomePage}
      currentPath={currentPath}
    >
      <div className="First">
        <div className="NameContainer">
          <Link to="/" className="Org">
            <img src={Org}></img>
          </Link>
        </div>

        <div className="BurgerContainer" onClick={handleMobileNavClick}>
          {isClicked ? (
            <HiX className="HamburgerIcon" />
          ) : (
            <GiHamburgerMenu className="HamburgerIcon" />
          )}
        </div>

        <div className="LinksContainer">
          <Link to="/latest-news" className="Link">
            Senaste nytt!
          </Link>

          <Link to="/membership" className="Link">
            Medlemskap
          </Link>

          <div className="DropLinkContainer">
            <Link to="/about" className="Link">
              Om ORG <AiOutlineDown className="Arrow" />
            </Link>
            <div className="DropContent">
              <Link to="/about/history" className="DropLink">
                Historia
              </Link>

              <Link to="/about/vision" className="DropLink">
                Vår vision
              </Link>

              <Link to="/about/board" className="DropLink">
                Styrelse
              </Link>

              <Link to="/about/statutes" className="DropLink">
                Stadgar
              </Link>

              <Link to="/about/annual-reports" className="DropLink">
                Årsredovisningar
              </Link>
            </div>
          </div>

          <div className="DropLinkContainer">
            <Link to="/event" className="Link">
              Event <AiOutlineDown className="Arrow" />
            </Link>

            <div className="DropContent">
              <Link to="/event/upcomming-events" className="DropLink">
                Kommande event
              </Link>

              <Link to="/event/past-events" className="DropLink">
                Tidigare event
              </Link>
            </div>
          </div>

          <Link to="/contact" className="Link">
            Kontakt
          </Link>
        </div>
      </div>

      <div className="Second">{isClicked && <MobileNav />}</div>
    </Body>
  );
};

export default Nav;
