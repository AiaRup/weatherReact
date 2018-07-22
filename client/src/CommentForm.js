import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      comment: ''
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment(this.props.indexOfPost, this.state );
  }

  render() {
    return (
      <form action="#" id="getWeatherForm" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="user"
            placeholder="Enter Your Name"
            required
            value={this.state.user}
            onChange={this.handleInputChange}/>
          <input
            type="text"
            className="form-control"
            id="comment"
            placeholder="Enter Comment"
            required
            value={this.state.comment}
            onChange={this.handleInputChange}/>
          <button className="input-group-btn btn btn-warning" type="submit">Comment</button>
        </div>
      </form>
    );
  }
}

export default CommentForm;