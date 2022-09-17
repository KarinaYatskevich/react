import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import React from "react";

const MyPosts = (props:any) => {
  let postElement = [...props.posts].reverse().map((p:any) => (
    <Post message={p.message} like={p.like} />
  ));

  let newPostElement:any = React.createRef();

  let onAddPost = () => {
    props.addPost()
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text)
  };

  return (
    <div className={s.myposts}>
      <h2>My posts</h2>
      <div className={s.postsPart}>
        <div>
          <textarea
            onChange={onPostChange}
            className={s.textarea}
            ref={newPostElement}
            value={props.newPostText}
          ></textarea>
          <button onClick={onAddPost} className={s.add}>
            add post
          </button>
        </div>
        <div className={s.posts}>{postElement}</div>
      </div>
    </div>
  );
};

export default MyPosts;
