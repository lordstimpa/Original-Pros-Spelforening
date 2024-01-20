import styled from "styled-components";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import API from "../API/API";
import Loading from "../Subpages/Loading";

const Body = styled.div`
  grid-column: 4 / 5;
  grid-row: 3 / 4;
  padding-top: 2rem;

  & .DateLinks {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    & .Link {
      margin-bottom: 1rem;
      font-weight: 600;
      text-decoration: none;
      color: #444444;
      text-align: center;
      margin-bottom: 1rem;
      padding: 0.6rem;
      border-radius: 0.5rem;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

      :hover {
        color: #f30067;
      }
    }

    & .Loading,
    .Error,
    .NotFound {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
    }
  }

  @media only screen and (max-width: 1280px) {
    display: none;
  }
`;

const PostDate = () => {
  const {
    data: datesPosted,
    isError,
    isLoading,
  } = API(`https://orgspelforening.azurewebsites.net/api/Posts/all-post-dates`);

  return (
    <Body>
      <div className="Links">
        <h2>Senaste nytt</h2>
      </div>
      <div className="DateLinks">
        {isLoading && (
          <div className="Loading">
            <Loading />
          </div>
        )}
        {isError && (
          <div className="Error">
            <p>Ett fel inträffade vid hämtning av senaste nytt.</p>
          </div>
        )}
        {!isLoading && !isError && datesPosted.length === 0 && (
          <div className="NotFound">
            <p>Inga inlägg hittades.</p>
          </div>
        )}
        {datesPosted.map((post) => (
          <RouterLink
            to={`/latest-news/${post.id}`}
            key={post.id}
            className="Link"
          >
            {post.created_date}
          </RouterLink>
        ))}
      </div>
    </Body>
  );
};

export default PostDate;
