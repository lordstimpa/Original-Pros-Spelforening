import styled from "styled-components";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../API/API";
import Gamer from "../../assets/gamer.jpg";
import Loading from "../Subpages/Loading";
import { Helmet } from "react-helmet";

const Body = styled.div`
  min-height: 100svh;
  min-width: 100%;
  background-image: url(${(props) => props.backgroundImg});
  background-size: cover;
  background-position: center;
  display: grid;
  grid-template-columns: 1fr 1200px 1fr;
  grid-template-rows: 4rem 250px auto 5em;

  & .Title {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    padding: 2rem;
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

  & .PostOuterContainer {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    display: flex;
    flex-direction: column;
    align-items: center;

    // Error / Loading / Notfound
    & .Loading,
    .Error,
    .NotFound {
      display: flex;
      justify-content: center;
      align-items: center;

      & p {
        color: #eaeaea;
      }
    }

    & .PostInnerContainer,
    .Loading,
    .Error,
    .NotFound {
      width: 750px;
      height: fit-content;
      border-radius: 2em;
      backdrop-filter: blur(25px);
      background: rgba(0, 0, 0, 0.4);
      padding: 2em;
      margin: 1em;

      & h2 {
        color: #eaeaea;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid #f30067;
      }

      & p {
        color: #eaeaea;
      }
    }
  }

  @media only screen and (max-width: 1500px) {
    grid-template-columns: 1fr 95% 1fr;

    & .Title {
      & h1 {
        letter-spacing: normal;
      }
    }

    & .PostOuterContainer {
      & .PostInnerContainer,
      .Loading,
      .Error,
      .NotFound {
        width: 90%;
        padding: 1rem 1rem 2rem 1rem;
        margin: 1rem 0 1rem 0;
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
`;

const Posts = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const {
    data: response,
    isError,
    isLoading,
  } = API(`https://orgspelforening.azurewebsites.net/api/Posts/all-posts`);

  const formatMessage = (message) => {
    return message.replace(/\n/g, "<br>");
  };

  useEffect(() => {
    if (!isLoading && response) {
      const postElement = document.getElementById(postId);
      if (postElement) {
        postElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [postId, navigate, isLoading, response]);

    return (
    <>
    <Helmet>
      <title>ORG - Latest News</title>
      <meta
        name="description"
        content="View latest new from Original Pros Gaming Association!"
      />
    </Helmet>

    <Body backgroundImg={Gamer}>
      <div className="Title">
        <h1>SENASTE NYTT!</h1>
      </div>
      <div className="PostOuterContainer">
        {isLoading && (
          <div className="Loading">
            <Loading />
          </div>
        )}
        {isError && (
          <div className="Error">
            <p>Ett fel inträffade vid hämtning av inlägg.</p>
          </div>
        )}
        {!isLoading && !isError && response.length === 0 && (
          <div className="NotFound">
            <p>Inga inlägg hittades.</p>
          </div>
        )}
        {response &&
          response.map((post) => (
            <div className="PostInnerContainer" key={post.id} id={post.id}>
              <h2>
                {post.start_date} - {post.start_time}
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: formatMessage(post.message || post.story),
                }}
              />
            </div>
          ))}
      </div>
    </Body>
    </>
  );
};

export default Posts;
