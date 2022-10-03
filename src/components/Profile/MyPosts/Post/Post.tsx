import s from './../MyPosts.module.css'

const Post = (props:any) => {
    return (
        <div className={s.item}>
          <div className={s.messages}>
            <p className={s.message}>{props.message}</p>
          </div>
        </div>
    )
}

export default Post