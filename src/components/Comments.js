import React from 'react';
import { Comment, CommentGrid } from './styles/CommentStyles';

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