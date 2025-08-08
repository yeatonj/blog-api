import Comment from "./Comment";

export default function CommentDetails({
    comments,
    serverPrefix,
    token,
    deauthHandler,
    blogId
}) {

    if (comments.length === 0) {
        return (
            <p>No Comments to Display.</p>
        )
    }

    const commentList = comments.map(comment => 
        <li key={comment.id}>
            <Comment 
                commentData={comment}
                serverPrefix={serverPrefix}
                token={token}
                deauthHandler={deauthHandler}
                blogId={blogId}
            />
        </li>
    )

    return (
        <ul>
            {commentList}
        </ul>
    )
}