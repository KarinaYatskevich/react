import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import React from "react";
import {PostType} from '../../../types/types';

export type MapPropsType = {
  posts: Array<PostType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

type PropsType = {
  addPost: any
  updateNewPostText: (text: string) => void
  newPostText: any
}

const MyPosts: React.FC<MapPropsType & PropsType & DispatchPropsType> = props => {
  let postElement = [...props.posts].reverse().map((p:any) => (
    <Post key={p.id} message={p.message}/>
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
        <div className={s.input_area}>
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
