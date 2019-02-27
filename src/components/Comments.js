import React from 'react';
import styled from 'styled-components';

const Comment = styled.div`
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

const CommentGrid = styled.div`
  flex: 1 0 40%;
  max-width: 40%;

  .comment-form {
    input, textarea {
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

class Comments extends React.Component {
  renderComment(comment, i) {
    return (
      <Comment key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button className='remove-comment' onClick={this.props.removeComment.bind(null, this.props.match.params.postId, i)}>&times;</button>
        </p>
      </Comment>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment(this.props.match.params.postId, this.refs.author.value, this.refs.comment.value);
    this.refs.commentForm.reset();
    this.refs.author.focus();
  }

  render() {
    const comments = this.props.comments[this.props.match.params.postId] || [];
    return (
      <CommentGrid>
        {comments.map(this.renderComment.bind(this))}

        <form onSubmit={this.handleSubmit} ref='commentForm' className='comment-form'>
          <input type='text' ref='author' placeholder='Author' />
          <input type='text' ref='comment' placeholder='Comment here...' />
          <input type='submit' hidden />
        </form>
      </CommentGrid>
    );
  }
}

export default Comments;