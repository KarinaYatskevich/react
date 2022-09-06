import React from "react";
import { connect } from "react-redux";
import { addPostActionCreator, updateNewPostActionCreator } from "../../../redux/profile-reduse";
import MyPosts from "./MyPosts";

let mapStateToProps = (state:any) => {
  return{
      posts: state.profilePage.posts,
      newPostText: state.profilePage.newPostText
  }
}
let mapDispatchToProps = (dispatch:any) => {
  return{
      updateNewPostText: (text:any) => {
        let action = updateNewPostActionCreator(text)
        dispatch(action);
      },
      addPost: () => {
        dispatch(addPostActionCreator());
      }
  }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer;
