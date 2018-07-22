import React from 'react';
import CommentBox from './CommentBox';

const CommentsListBox = ({ comments, indexPost, deleteComment }) => {
  console.log(comments);

  return (
    <div>
      {comments.map((comment, index) => <CommentBox key={index} index={index} indexPost={indexPost} deleteComment={deleteComment} comment={comment}/>
      )}
    </div>
  );
};


export default CommentsListBox;