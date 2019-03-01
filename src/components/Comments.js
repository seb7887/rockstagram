import React from 'react';
import { Comment, CommentGrid } from './styles/CommentStyles';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      comment: ''
    };
  }

  renderComment(comment, i) {
    return (
      <Comment key={i} data-testid='comment'>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button
            data-testid='remove-comment'
            className='remove-comment'
            onClick={this.props.removeComment.bind(
              null,
              this.props.match.params.postId,
              i,
            )}
          >
            &times;
          </button>
        </p>
      </Comment>
    );
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment(
      this.props.match.params.postId,
      this.state.author,
      this.state.comment,
    );
    this.clearForm();
    this.setState({
      author: '',
      comment: ''
    });
  };

  clearForm() {
    document.getElementById('form').reset();
  }

  render() {
    const comments = this.props.comments[this.props.match.params.postId] || [];
    return (
      <CommentGrid>
        {comments.map(this.renderComment.bind(this))}

        <form
          onSubmit={this.handleSubmit}
          id='form'
          className='comment-form'
          data-testid='form'
        >
          <input
            type='text'
            name='author'
            placeholder='Author'
            onChange={this.handleChange}
            data-testid='author'
          />
          <input
            type='text'
            name='comment'
            placeholder='Comment here...'
            onChange={this.handleChange}
            data-testid='text'
          />
          <input type='submit' hidden />
        </form>
      </CommentGrid>
    );
  }
}

export default Comments;
