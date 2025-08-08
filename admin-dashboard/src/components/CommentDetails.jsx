import Comment from "./Comment";

export default function CommentDetails({
    comments,
    serverPrefix,
    token,
    deauthHandler,
    commentsFlipped,
    commentsFlippedSetter,
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
                commentsFlipped={commentsFlipped}
                commentsFlippedSetter={commentsFlippedSetter}
            />
        </li>
    )

    return (
        <ul>
            {commentList}
        </ul>
    )
}