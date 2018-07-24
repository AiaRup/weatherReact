import React from 'react';
import CommentsListBox from './CommentsListBox';
import CommentForm from './CommentForm';

const WeatherBox = props => {
  const handleDeletePost = () => {
    props.deletePost(props.index);
  };

  return (
    <div className="city-post">
      <div className="media-body">
        <h4 className="media-heading">{props.item.name}, {props.item.country}
          <div className="icons">
            <i className="fa fa-trash-o remove-item" onClick={handleDeletePost}></i>
          </div>
        </h4>
        <p>{props.item.feelslike_c} &#x2103; / {props.item.feelslike_f} &#x2109;
          <img src={props.item.icon} alt={props.item.name} className="media-object" style={{ width: 60 }}/>
          {props.item.text}</p>
      </div>
      <CommentForm indexOfPost={props.index} addComment={props.addComment} />
      <CommentsListBox comments={props.item.comments} indexPost={props.index} deleteComment={props.deleteComment}/>
    </div>
  );
};

export default WeatherBox;