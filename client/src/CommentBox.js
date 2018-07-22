import React from 'react';

const CommentBox = ({ comment, index, indexPost, deleteComment }) => {

  const handleDelete = () => {
    deleteComment(index, indexPost);
  };

  return (
    <p className="commentBox">
      <i className="fa fa-comments-o"></i>
        Written By: {comment.user} - {comment.comment}
      <i className="fa fa-trash-o delete-comment" onClick={handleDelete}></i>
    </p>
  );
};

export default CommentBox;