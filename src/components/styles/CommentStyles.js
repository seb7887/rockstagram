import styled from 'styled-components';

export const Comment = styled.div`
  border-bottom: 1px solid var(--lightgrey);
  padding: 0.5rem 0;

  p {
    font-size: 1.2rem;
    margin: 0;

    strong {
      color: var(--black);
      margin-right: 5px;
    }

    .remove-comment {
      background: none;
      border: 0;
      line-height: 1;
      opacity: 0;

      &:hover {
        color: red;
        opacity: 1;
      }
    }
  }
`;

export const CommentGrid = styled.div`
  flex: 1 0 40%;
  max-width: 40%;

  .comment-form {
    input,
    textarea {
      width: 100%;
      border: 0;
      font-size: 1.3rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--lightgrey);
      outline: none;
      resize: vertical;
    }
  }
`;
