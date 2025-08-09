import Comment from "./Comment"

export default function CommentsSection({
    comments
}) {

    if (comments.length === 0) {
        return (
            <>
                <h3>Comments:</h3>
                <p>There are no comments yet. You could be the first!</p>
            </>
        )
    }

    const postComments = comments.map(comment => {
        return (
            <li key={comment.id}>
                <Comment 
                    details={comment}
                />
            </li>
        )
    })


    return (
        <>
            <h3>Comments:</h3>
            <ul>{postComments}</ul>
        </>
        
    )
}